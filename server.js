const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');
const { Pool } = require('pg');
const PgSessionStore = require('connect-pg-simple')(session);

const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');
const dataDir = path.join(__dirname, 'data');
const usersFile = path.join(dataDir, 'users.json');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
  max: Number(process.env.DATABASE_POOL_SIZE) || 10,
});

app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: new PgSessionStore({ pool, tableName: 'user_sessions', createTableIfMissing: true }),
    secret: process.env.SESSION_SECRET || 'local-development-secret-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 8,
    },
  })
);

function requireRole(...roles) {
  return async (req, res, next) => {
    if (!req.session.user) return res.status(401).json({ message: 'Sign in required.' });
    try {
      const { rows } = await pool.query(
        'SELECT id, name, email, role, subject, profile FROM accounts WHERE id = $1 AND approved = TRUE',
        [req.session.user.id]
      );
      if (!rows.length) {
        req.session.destroy(() => {});
        return res.status(401).json({ message: 'Your account is no longer active. Sign in again.' });
      }
      req.session.user = getPublicUser(rows[0]);
      if (!roles.includes(req.session.user.role)) return res.status(403).json({ message: 'You do not have permission to do that.' });
      next();
    } catch (error) {
      next(error);
    }
  };
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function getGradeBand(score) {
  if (score >= 80) return 'A';
  if (score >= 75) return 'A-';
  if (score >= 71) return 'B+';
  if (score >= 66) return 'B';
  if (score >= 61) return 'B-';
  if (score >= 56) return 'C+';
  if (score >= 51) return 'C';
  if (score >= 46) return 'C-';
  if (score >= 41) return 'D+';
  if (score >= 36) return 'D';
  if (score >= 31) return 'D-';
  return 'E';
}

function getHomeworkBonusPoints(createdAt, submittedAt) {
  const elapsedMilliseconds = new Date(submittedAt).getTime() - new Date(createdAt).getTime();
  const elapsedHours = elapsedMilliseconds / (60 * 60 * 1000);
  if (!Number.isFinite(elapsedHours) || elapsedHours < 0 || elapsedHours >= 6) return 0;
  return 6 - Math.floor(elapsedHours);
}

function getPublicUser(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    subject: row.subject,
    staffTitle: row.profile?.staffTitle || null,
  };
}

async function regenerateSession(req) {
  await new Promise((resolve, reject) => {
    req.session.regenerate((error) => error ? reject(error) : resolve());
  });
}

async function initializeDatabase() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL must point to the hosted PostgreSQL database.');
  if (process.env.NODE_ENV === 'production' && !process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET must be set in production.');
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS accounts (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
      subject TEXT,
      approved BOOLEAN NOT NULL DEFAULT FALSE,
      profile JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS homework (
      id TEXT PRIMARY KEY,
      teacher_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      instructions TEXT NOT NULL,
      subject TEXT NOT NULL,
      classroom_url TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL,
      due_at TIMESTAMPTZ NOT NULL,
      CHECK (due_at = created_at + INTERVAL '24 hours')
    );
    CREATE TABLE IF NOT EXISTS homework_submissions (
      id TEXT PRIMARY KEY,
      homework_id TEXT NOT NULL REFERENCES homework(id) ON DELETE CASCADE,
      student_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
      submitted_at TIMESTAMPTZ NOT NULL,
      bonus_points INTEGER NOT NULL DEFAULT 0 CHECK (bonus_points BETWEEN 0 AND 6),
      base_score NUMERIC(5,2),
      final_score NUMERIC(5,2),
      grade_band TEXT,
      graded_at TIMESTAMPTZ,
      UNIQUE (homework_id, student_id)
    );
    CREATE INDEX IF NOT EXISTS homework_teacher_created_idx ON homework(teacher_id, created_at DESC);
    CREATE INDEX IF NOT EXISTS homework_due_idx ON homework(due_at);
    CREATE INDEX IF NOT EXISTS homework_submissions_student_idx ON homework_submissions(student_id, submitted_at DESC);
  `);

  if (fs.existsSync(usersFile)) {
    const legacyUsers = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    for (const user of legacyUsers) {
      if (!user.email || !user.passwordHash) continue;
      await pool.query(
        `INSERT INTO accounts (id, name, email, password_hash, role, approved)
         VALUES ($1, $2, $3, $4, 'student', TRUE) ON CONFLICT (email) DO NOTHING`,
        [String(user.id || randomUUID()), user.name || 'Student', normalizeEmail(user.email), user.passwordHash]
      );
    }
  }

  const adminEmail = normalizeEmail(process.env.BOOTSTRAP_ADMIN_EMAIL || 'somavanza@gmail.com');
  const adminPassword = process.env.BOOTSTRAP_ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await pool.query(
      `INSERT INTO accounts (id, name, email, password_hash, role, approved)
       VALUES ($1, $2, $3, $4, 'admin', TRUE) ON CONFLICT (email) DO NOTHING`,
      [randomUUID(), process.env.BOOTSTRAP_ADMIN_NAME || 'School Admin', adminEmail, passwordHash]
    );
  }

  const adminCount = await pool.query("SELECT COUNT(*)::int AS count FROM accounts WHERE role = 'admin' AND approved = TRUE");
  if (!adminCount.rows[0].count) {
    throw new Error('No approved admin exists. Set BOOTSTRAP_ADMIN_EMAIL and BOOTSTRAP_ADMIN_PASSWORD for first-time setup.');
  }
}

const subjects = [
  { id: 'maths', name: 'Maths', teacher: 'Mr. Kamau', time: 'Today • 4:00 PM', progress: 76, level: 'Foundation', accent: '#5b63ff', summary: 'Focus on algebra, problem solving, and targeted revision for the next test cycle.' },
  { id: 'eng', name: 'English', teacher: 'Ms. Achieng', time: 'Today • 11:00 AM', progress: 84, level: 'Critical Writing', accent: '#ff8b67', summary: 'Reading comprehension, essay planning, and grammar mastery for confident writing.' },
  { id: 'kiswa', name: 'Kiswahili', teacher: 'Mrs. Kibet', time: 'Tomorrow • 10:00 AM', progress: 66, level: 'Grammar', accent: '#42d3a0', summary: 'Build fluency in grammar, literature analysis, and spoken communication.' },
  { id: 'histo', name: 'History', teacher: 'Mr. Otieno', time: 'Today • 2:15 PM', progress: 71, level: 'World History', accent: '#7d6eff', summary: 'Understand key events, interpretation, and exam techniques through guided discussion.' },
  { id: 'comp', name: 'Computer', teacher: 'Mr. Wambua', time: 'Today • 5:30 PM', progress: 89, level: 'Programming Basics', accent: '#4db6ff', summary: 'Develop digital literacy, web fundamentals, and analytical thinking with live coding tasks.' },
  { id: 'geo', name: 'Geography', teacher: 'Mrs. Ngugi', time: 'Wed • 9:00 AM', progress: 72, level: 'Map Skills', accent: '#2ec4b6', summary: 'Learn map reading, climate systems, and global connections through field-based examples.' },
  { id: 'chem', name: 'Chemistry', teacher: 'Dr. Njuguna', time: 'Today • 1:30 PM', progress: 80, level: 'Lab Skills', accent: '#ff9f43', summary: 'Explore practical chemistry concepts, safe lab work, and reaction analysis.' },
  { id: 'bio', name: 'Biology', teacher: 'Dr. Muli', time: 'Thu • 11:30 AM', progress: 78, level: 'Human Systems', accent: '#43c979', summary: 'Investigate cells, body systems, and genetics with interactive visual revision.' },
  { id: 'phy', name: 'Physics', teacher: 'Mr. Sande', time: 'Fri • 8:45 AM', progress: 61, level: 'Mechanics', accent: '#48a9ff', summary: 'Understand motion, forces, and experiments through simulation and practice tasks.' },
  { id: 'busi', name: 'Business', teacher: 'Mrs. Wairimu', time: 'Today • 4:00 PM', progress: 87, level: 'Entrepreneurship', accent: '#9b7bff', summary: 'Study business planning, marketing fundamentals, and entrepreneurship strategies.' },
  { id: 'elec', name: 'Electronics', teacher: 'Mr. Kabiru', time: 'Mon • 12:00 PM', progress: 68, level: 'Circuit Design', accent: '#ff7cc8', summary: 'Practice circuits, electronics systems, and problem solving for real-world devices.' },
  { id: 'avia', name: 'Aviation', teacher: 'Capt. Muthoni', time: 'Tue • 2:00 PM', progress: 74, level: 'Flight Operations', accent: '#6bb1ff', summary: 'Cover navigation, flight safety, and aviation operations with guided industry examples.' }
];

const classes = [
  { id: 'maths-lab', subject: 'maths', title: 'Mathematics Mastery Lab', teacher: 'Mr. Kamau', start: 'Today • 4:00 PM', duration: '45 min', room: 'Room A1', attendees: 32 },
  { id: 'eng-crit', subject: 'eng', title: 'English Writing Studio', teacher: 'Ms. Achieng', start: 'Today • 11:00 AM', duration: '50 min', room: 'Room B2', attendees: 28 },
  { id: 'chem-lab', subject: 'chem', title: 'Chemistry Practical Lab', teacher: 'Dr. Njuguna', start: 'Today • 1:30 PM', duration: '40 min', room: 'Lab 3', attendees: 22 },
  { id: 'busi-pitch', subject: 'busi', title: 'Business Pitch Clinic', teacher: 'Mrs. Wairimu', start: 'Today • 4:00 PM', duration: '55 min', room: 'Room C4', attendees: 26 },
  { id: 'comp-code', subject: 'comp', title: 'Computer Fundamentals', teacher: 'Mr. Wambua', start: 'Today • 5:30 PM', duration: '60 min', room: 'Digital Lab', attendees: 30 }
];

app.get('/healthz', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch (error) {
    res.status(503).json({ status: 'unavailable' });
  }
});

const studentPages = new Set([
  'dashboard.html', 'my-classes.html', 'subjects.html', 'progress.html', 'materials.html', 'assessment.html',
  'maths.html', 'eng.html', 'kiswa.html', 'histo.html', 'comp.html', 'geo.html', 'chem.html', 'bio.html',
  'phy.html', 'busi.html', 'elec.html', 'avia.html',
]);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/script.js', (req, res) => res.sendFile(path.join(__dirname, 'script.js')));
app.get('/style.css', (req, res) => res.sendFile(path.join(__dirname, 'style.css')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/subjects', express.static(path.join(__dirname, 'subjects')));

app.get(/^\/([A-Za-z0-9_-]+\.html)$/, (req, res, next) => {
  const page = req.params[0];
  const pagePath = path.join(__dirname, page);
  if (!fs.existsSync(pagePath)) return next();
  if (studentPages.has(page) && req.session.user?.role !== 'student') return res.redirect('/index.html');
  res.sendFile(pagePath);
});

app.use(express.static(publicDir));

app.get('/dashboard', (req, res) => {
  if (req.session.user?.role !== 'student') return res.redirect('/');
  res.sendFile(path.join(publicDir, 'dashboard.html'));
});

app.get('/subjects', (req, res) => {
  if (req.session.user?.role !== 'student') return res.redirect('/');
  res.sendFile(path.join(publicDir, 'subjects.html'));
});

app.get('/class-room', (req, res) => {
  if (req.session.user?.role !== 'student') return res.redirect('/');
  res.sendFile(path.join(publicDir, 'class-room.html'));
});

app.get('/api/session', async (req, res, next) => {
  if (!req.session.user) return res.status(401).json({ loggedIn: false });
  try {
    const { rows } = await pool.query(
      'SELECT id, name, email, role, subject, profile FROM accounts WHERE id = $1 AND approved = TRUE',
      [req.session.user.id]
    );
    if (!rows.length) return req.session.destroy(() => res.status(401).json({ loggedIn: false }));
    req.session.user = getPublicUser(rows[0]);
    res.json({ loggedIn: true, user: req.session.user });
  } catch (error) {
    next(error);
  }
});

app.post(['/api/login', '/api/auth/login'], async (req, res, next) => {
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password || '');
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });

  try {
    const { rows } = await pool.query('SELECT * FROM accounts WHERE email = $1', [email]);
    const account = rows[0];
    if (!account || !(await bcrypt.compare(password, account.password_hash))) {
      return res.status(401).json({ message: 'Invalid login details.' });
    }
    if (!account.approved) return res.status(403).json({ message: 'Your account is awaiting admin approval.' });

    await regenerateSession(req);
    req.session.user = getPublicUser(account);
    res.json({ success: true, user: req.session.user });
  } catch (error) {
    next(error);
  }
});

app.post(['/api/logout', '/api/auth/logout'], (req, res, next) => {
  req.session.destroy((error) => {
    if (error) return next(error);
    res.clearCookie('connect.sid');
    res.json({ success: true });
  });
});

app.post('/api/student-requests', async (req, res, next) => {
  const name = String(req.body?.studentName || '').trim();
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password || '');
  if (!name || !email || password.length < 6) return res.status(400).json({ message: 'Name, valid email, and a password of at least 6 characters are required.' });

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const profile = {
      phone: String(req.body?.phone || '').trim(),
      grade: String(req.body?.grade || '').trim(),
      mpesaRef: String(req.body?.mpesaRef || '').trim(),
    };
    const { rows } = await pool.query(
      `INSERT INTO accounts (id, name, email, password_hash, role, approved, profile)
       VALUES ($1, $2, $3, $4, 'student', FALSE, $5) RETURNING id`,
      [randomUUID(), name, email, passwordHash, profile]
    );
    res.status(201).json({ success: true, id: rows[0].id, message: 'Your request was sent for admin approval.' });
  } catch (error) {
    if (error.code === '23505') return res.status(409).json({ message: 'An account or request already exists for that email.' });
    next(error);
  }
});

app.post('/api/teacher-requests', async (req, res, next) => {
  const name = String(req.body?.teacherName || '').trim();
  const email = normalizeEmail(req.body?.teacherEmail);
  const password = String(req.body?.teacherPassword || '');
  const subject = String(req.body?.subject || '').trim();
  if (!name || !email || password.length < 6 || !subjects.some((item) => item.name === subject)) {
    return res.status(400).json({ message: 'Provide a name, valid email, 6-character password, and valid subject.' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const { rows } = await pool.query(
      `INSERT INTO accounts (id, name, email, password_hash, role, subject, approved)
       VALUES ($1, $2, $3, $4, 'teacher', $5, FALSE) RETURNING id`,
      [randomUUID(), name, email, passwordHash, subject]
    );
    res.status(201).json({ success: true, id: rows[0].id, message: 'Your request was sent for admin approval.' });
  } catch (error) {
    if (error.code === '23505') return res.status(409).json({ message: 'An account or request already exists for that email.' });
    next(error);
  }
});

app.get('/api/admin/requests', requireRole('admin'), async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, name, email, role, subject, profile, created_at AS "createdAt"
       FROM accounts WHERE approved = FALSE ORDER BY created_at ASC`
    );
    res.json(rows.map((account) => ({
      id: account.id,
      type: account.role,
      studentName: account.role === 'student' ? account.name : undefined,
      teacherName: account.role === 'teacher' ? account.name : undefined,
      name: account.name,
      email: account.email,
      subject: account.subject,
      grade: account.profile?.grade,
      phone: account.profile?.phone,
      mpesaRef: account.profile?.mpesaRef,
      createdAt: account.createdAt,
    })));
  } catch (error) {
    next(error);
  }
});

app.post('/api/admin/requests/:id/approve', requireRole('admin'), async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `UPDATE accounts SET approved = TRUE WHERE id = $1 AND approved = FALSE AND role IN ('student', 'teacher')
       RETURNING id, name, email, role, subject`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ message: 'Pending account not found.' });
    res.json({ success: true, account: rows[0] });
  } catch (error) {
    next(error);
  }
});

app.delete('/api/admin/requests/:id', requireRole('admin'), async (req, res, next) => {
  try {
    const result = await pool.query('DELETE FROM accounts WHERE id = $1 AND approved = FALSE', [req.params.id]);
    if (!result.rowCount) return res.status(404).json({ message: 'Pending request not found.' });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

app.get('/api/admin/teachers', requireRole('admin'), async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, name, email, subject, profile->>'staffTitle' AS role, created_at AS "approvedAt"
       FROM accounts WHERE role = 'teacher' AND approved = TRUE ORDER BY name`
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

app.post('/api/admin/teachers', requireRole('admin'), async (req, res, next) => {
  const name = String(req.body?.name || '').trim();
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password || '');
  const subject = String(req.body?.subject || '').trim();
  const staffTitle = String(req.body?.staffTitle || 'Teacher').trim();
  if (!name || !email || password.length < 6 || !subjects.some((item) => item.name === subject)) {
    return res.status(400).json({ message: 'Provide valid teacher details and assigned subject.' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const { rows } = await pool.query(
      `INSERT INTO accounts (id, name, email, password_hash, role, subject, approved, profile)
       VALUES ($1, $2, $3, $4, 'teacher', $5, TRUE, $6)
       RETURNING id, name, email, subject, created_at AS "approvedAt"`,
      [randomUUID(), name, email, passwordHash, subject, { staffTitle }]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    if (error.code === '23505') return res.status(409).json({ message: 'An account already exists for that email.' });
    next(error);
  }
});

app.delete('/api/admin/teachers/:id', requireRole('admin'), async (req, res, next) => {
  try {
    const result = await pool.query("DELETE FROM accounts WHERE id = $1 AND role = 'teacher'", [req.params.id]);
    if (!result.rowCount) return res.status(404).json({ message: 'Teacher not found.' });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

app.get('/api/teachers/by-subject', requireRole('student'), async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT subject, ARRAY_AGG(name ORDER BY name) AS teachers
       FROM accounts WHERE role = 'teacher' AND approved = TRUE AND subject IS NOT NULL
       GROUP BY subject ORDER BY subject`
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

app.post('/api/teacher/homework', requireRole('teacher'), async (req, res, next) => {
  const title = String(req.body?.title || '').trim();
  const instructions = String(req.body?.instructions || '').trim();
  let classroomUrl;
  try {
    classroomUrl = new URL(String(req.body?.classroomUrl || ''));
  } catch (error) {
    return res.status(400).json({ message: 'Paste a valid Google Classroom URL.' });
  }
  if (!req.session.user.subject) return res.status(403).json({ message: 'No subject is assigned to this teacher.' });
  if (!title || !instructions || classroomUrl.protocol !== 'https:' || classroomUrl.hostname !== 'classroom.google.com') {
    return res.status(400).json({ message: 'Provide a title, instructions, and HTTPS Google Classroom URL.' });
  }

  const createdAt = new Date();
  const dueAt = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000);
  try {
    const { rows } = await pool.query(
      `INSERT INTO homework (id, teacher_id, title, instructions, subject, classroom_url, created_at, due_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, title, instructions, subject, classroom_url AS "classroomUrl", created_at AS "createdAt", due_at AS "dueAt"`,
      [randomUUID(), req.session.user.id, title, instructions, req.session.user.subject, classroomUrl.href, createdAt, dueAt]
    );
    res.status(201).json({ ...rows[0], teacherName: req.session.user.name });
  } catch (error) {
    next(error);
  }
});

app.get('/api/teacher/homework', requireRole('teacher'), async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT h.id, h.title, h.instructions, h.subject, h.classroom_url AS "classroomUrl",
              h.created_at AS "createdAt", h.due_at AS "dueAt", a.name AS "teacherName",
              COALESCE(JSON_AGG(JSON_BUILD_OBJECT(
                'studentId', s.student_id, 'studentName', student.name, 'studentEmail', student.email,
                'submittedAt', s.submitted_at, 'bonusPoints', s.bonus_points, 'baseScore', s.base_score,
                'finalScore', s.final_score, 'gradeBand', s.grade_band, 'gradedAt', s.graded_at
              ) ORDER BY s.submitted_at) FILTER (WHERE s.id IS NOT NULL), '[]'::json) AS submissions
       FROM homework h JOIN accounts a ON a.id = h.teacher_id
       LEFT JOIN homework_submissions s ON s.homework_id = h.id
       LEFT JOIN accounts student ON student.id = s.student_id
       WHERE h.teacher_id = $1 AND h.subject = $2
       GROUP BY h.id, a.name ORDER BY h.created_at DESC`,
      [req.session.user.id, req.session.user.subject]
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

app.get('/api/homework', requireRole('student'), async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT h.id, h.title, h.instructions, h.subject, h.classroom_url AS "classroomUrl",
              h.created_at AS "createdAt", h.due_at AS "dueAt", teacher.name AS "teacherName",
              s.submitted_at AS "submittedAt", s.bonus_points AS "bonusPoints", s.base_score AS "baseScore",
              s.final_score AS "finalScore", s.grade_band AS "gradeBand"
       FROM homework h JOIN accounts teacher ON teacher.id = h.teacher_id
       LEFT JOIN homework_submissions s ON s.homework_id = h.id AND s.student_id = $1
       WHERE h.due_at >= NOW() OR s.id IS NOT NULL
       ORDER BY h.due_at ASC`,
      [req.session.user.id]
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

app.post('/api/homework/:id/submissions', requireRole('student'), async (req, res, next) => {
  try {
    const homeworkResult = await pool.query('SELECT id, created_at, due_at FROM homework WHERE id = $1', [req.params.id]);
    const homeworkItem = homeworkResult.rows[0];
    if (!homeworkItem) return res.status(404).json({ message: 'Homework not found.' });
    const submittedAt = new Date();
    if (submittedAt.getTime() > new Date(homeworkItem.due_at).getTime()) return res.status(410).json({ message: 'The 24-hour submission deadline has passed.' });
    const bonusPoints = getHomeworkBonusPoints(homeworkItem.created_at, submittedAt);
    const { rows } = await pool.query(
      `INSERT INTO homework_submissions (id, homework_id, student_id, submitted_at, bonus_points)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (homework_id, student_id) DO NOTHING
       RETURNING submitted_at AS "submittedAt", bonus_points AS "bonusPoints"`,
      [randomUUID(), homeworkItem.id, req.session.user.id, submittedAt, bonusPoints]
    );
    if (!rows.length) return res.status(409).json({ message: 'You have already recorded a submission for this homework.' });
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
});

app.patch('/api/teacher/homework/:id/submissions/:studentId', requireRole('teacher'), async (req, res, next) => {
  const baseScore = Number(req.body?.baseScore);
  if (!Number.isFinite(baseScore) || baseScore < 0 || baseScore > 100) return res.status(400).json({ message: 'Base score must be between 0 and 100.' });

  try {
    const { rows: homeworkRows } = await pool.query(
      'SELECT id, created_at, subject FROM homework WHERE id = $1 AND teacher_id = $2 AND subject = $3',
      [req.params.id, req.session.user.id, req.session.user.subject]
    );
    const homeworkItem = homeworkRows[0];
    if (!homeworkItem) return res.status(404).json({ message: 'Homework not found for your account and assigned subject.' });
    const { rows: submissionRows } = await pool.query(
      'SELECT id, submitted_at FROM homework_submissions WHERE homework_id = $1 AND student_id = $2',
      [homeworkItem.id, req.params.studentId]
    );
    const submission = submissionRows[0];
    if (!submission) return res.status(404).json({ message: 'Student submission not found.' });

    const bonusPoints = getHomeworkBonusPoints(homeworkItem.created_at, submission.submitted_at);
    const finalScore = Math.min(100, baseScore + bonusPoints);
    const gradeBand = getGradeBand(finalScore);
    const { rows } = await pool.query(
      `UPDATE homework_submissions
       SET bonus_points = $1, base_score = $2, final_score = $3, grade_band = $4, graded_at = NOW()
       WHERE id = $5
       RETURNING submitted_at AS "submittedAt", bonus_points AS "bonusPoints", base_score AS "baseScore",
                 final_score AS "finalScore", grade_band AS "gradeBand", graded_at AS "gradedAt"`,
      [bonusPoints, baseScore, finalScore, gradeBand, submission.id]
    );
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

app.get('/api/student/progress', requireRole('student'), async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT h.subject, ROUND(AVG(s.final_score))::int AS "averageScore", COUNT(*)::int AS "gradedCount"
       FROM homework_submissions s JOIN homework h ON h.id = s.homework_id
       WHERE s.student_id = $1 AND s.final_score IS NOT NULL
       GROUP BY h.subject ORDER BY h.subject`,
      [req.session.user.id]
    );
    const { rows: totals } = await pool.query(
      `SELECT ROUND(AVG(final_score))::int AS "overallScore", COUNT(*)::int AS "gradedCount"
       FROM homework_submissions WHERE student_id = $1 AND final_score IS NOT NULL`,
      [req.session.user.id]
    );
    const { rows: counts } = await pool.query(
      'SELECT COUNT(*)::int AS "submittedCount" FROM homework_submissions WHERE student_id = $1',
      [req.session.user.id]
    );
    res.json({ subjects: rows, ...totals[0], ...counts[0] });
  } catch (error) {
    next(error);
  }
});

app.get('/api/subjects', (req, res) => {
  res.json(subjects);
});

app.get('/api/classes', (req, res) => {
  const { subject } = req.query;
  if (subject) {
    return res.json(classes.filter((item) => item.subject === subject));
  }
  res.json(classes);
});

app.get('/api/subject/:id', (req, res) => {
  const subject = subjects.find((entry) => entry.id === req.params.id);
  if (!subject) {
    return res.status(404).json({ message: 'Subject not found' });
  }
  res.json(subject);
});

app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.use((error, req, res, next) => {
  console.error(error);
  if (res.headersSent) return next(error);
  res.status(500).json({ message: 'An unexpected server error occurred.' });
});

initializeDatabase()
  .then(() => app.listen(PORT, () => console.log(`somavanza server running at http://localhost:${PORT}`)))
  .catch((error) => {
    console.error(`Unable to start Somavanza: ${error.message}`);
    process.exitCode = 1;
    pool.end();
  });
