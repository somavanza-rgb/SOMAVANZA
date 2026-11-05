const subjectData = [
  { id: 'maths', name: 'Maths', teacher: 'Mr. Kamau', time: 'Today • 4:00 PM', progress: 76, level: 'Foundation', accent: '#5b63ff', summary: 'A focus on algebra, equations, problem-solving, and exam confidence for upcoming tests.', topics: ['Algebra', 'Fractions', 'Equations', 'Geometry', 'Revision drills'] },
  { id: 'eng', name: 'English', teacher: 'Ms. Achieng', time: 'Today • 11:00 AM', progress: 84, level: 'Critical Writing', accent: '#ff8b67', summary: 'Reading comprehension, essay planning, grammar mastery, and speaking confidence.', topics: ['Reading', 'Essay structure', 'Grammar', 'Speech', 'Comprehension'] },
  { id: 'kiswa', name: 'Kiswahili', teacher: 'Mrs. Kibet', time: 'Tomorrow • 10:00 AM', progress: 66, level: 'Grammar', accent: '#42d3a0', summary: 'Language skills, writing, oral fluency, and literature interpretation in Kiswahili.', topics: ['Vocabulary', 'Writing', 'Literature', 'Speaking', 'Grammar'] },
  { id: 'histo', name: 'History', teacher: 'Mr. Otieno', time: 'Today • 2:15 PM', progress: 71, level: 'World History', accent: '#7d6eff', summary: 'Exploring key historical eras, source analysis, and timeline-building strategies.', topics: ['Civilizations', 'Source analysis', 'Timelines', 'Reforms', 'Essays'] },
  { id: 'comp', name: 'Computer', teacher: 'Mr. Wambua', time: 'Today • 5:30 PM', progress: 89, level: 'Programming Basics', accent: '#4db6ff', summary: 'Hands-on digital literacy, coding fundamentals, and productivity tools for modern learners.', topics: ['Typing', 'Algorithms', 'Web basics', 'Logic', 'Projects'] },
  { id: 'geo', name: 'Geography', teacher: 'Mrs. Ngugi', time: 'Wed • 9:00 AM', progress: 72, level: 'Map Skills', accent: '#2ec4b6', summary: 'Map reading, climate analysis, population studies, and environmental awareness.', topics: ['Map reading', 'Weather', 'Rivers', 'Settlements', 'Case studies'] },
  { id: 'chem', name: 'Chemistry', teacher: 'Dr. Njuguna', time: 'Today • 1:30 PM', progress: 80, level: 'Lab Skills', accent: '#ff9f43', summary: 'Practical chemical reactions, matter concepts, and laboratory safety techniques.', topics: ['Atoms', 'Reactions', 'Safety', 'Acids & bases', 'Lab reporting'] },
  { id: 'bio', name: 'Biology', teacher: 'Dr. Muli', time: 'Thu • 11:30 AM', progress: 78, level: 'Human Systems', accent: '#43c979', summary: 'Life systems, cells, ecology, and scientific observation in a learner-friendly format.', topics: ['Cells', 'Human body', 'Plants', 'Ecology', 'Experiments'] },
  { id: 'phy', name: 'Physics', teacher: 'Mr. Sande', time: 'Fri • 8:45 AM', progress: 61, level: 'Mechanics', accent: '#48a9ff', summary: 'Motion, forces, energy concepts, and practical problem-solving in physics.', topics: ['Motion', 'Forces', 'Energy', 'Electricity', 'Calculations'] },
  { id: 'busi', name: 'Business', teacher: 'Mrs. Wairimu', time: 'Today • 4:00 PM', progress: 87, level: 'Entrepreneurship', accent: '#9b7bff', summary: 'Business planning, finance literacy, communication, and enterprise skills.', topics: ['Marketing', 'Finance', 'Sales', 'Planning', 'Case studies'] },
  { id: 'elec', name: 'Electronics', teacher: 'Mr. Kabiru', time: 'Mon • 12:00 PM', progress: 68, level: 'Circuit Design', accent: '#ff7cc8', summary: 'Introduction to circuits, electrical safety, and practical component testing.', topics: ['Circuits', 'Components', 'Safety', 'Design', 'Testing'] },
  { id: 'avia', name: 'Aviation', teacher: 'Capt. Muthoni', time: 'Tue • 2:00 PM', progress: 74, level: 'Flight Operations', accent: '#6bb1ff', summary: 'Flight planning, navigation basics, safety awareness, and aviation systems understanding.', topics: ['Navigation', 'Safety', 'Weather', 'Flight planning', 'Air traffic'] }
];

const materialData = [
  {
    subject: 'English',
    category: 'English',
    title: 'Essay writing guide on a Silent Song',
    type: 'PDF Notes',
    teacher: 'Ms. Achieng',
    updated: 'Uploaded today',
    url: 'https://drive.google.com/'
  },
  {
    subject: 'Biology',
    category: 'Biology',
    title: 'Biology Notes for Genetics',
    type: 'Teacher PDF',
    teacher: 'Dr. Muli',
    updated: 'Uploaded this week',
    url: 'https://drive.google.com/'
  },
  {
    subject: 'English',
    category: 'English',
    title: 'Silent Song analysis notes',
    type: 'Lesson notes',
    teacher: 'Ms. Achieng',
    updated: 'Uploaded yesterday',
    url: 'https://drive.google.com/'
  },
  {
    subject: 'Biology',
    category: 'Biology',
    title: 'Genetics revision summary',
    type: 'PDF Notes',
    teacher: 'Dr. Muli',
    updated: 'Uploaded 3 days ago',
    url: 'https://drive.google.com/'
  }
];

const recordedLessonData = [
  {
    subject: 'English',
    title: 'Silent Song lesson recording',
    teacher: 'Ms. Achieng',
    date: 'Recorded on Monday',
    url: 'https://meet.google.com/'
  },
  {
    subject: 'Biology',
    title: 'Genetics lesson catch-up recording',
    teacher: 'Dr. Muli',
    date: 'Recorded on Wednesday',
    url: 'https://meet.google.com/'
  }
];

const subjectLookup = Object.fromEntries(subjectData.map((subject) => [subject.id, subject]));
const subjectGrid = document.getElementById('subjectGrid');
const loginForm = document.getElementById('loginForm');
const authScreen = document.getElementById('authScreen');
const dashboard = document.getElementById('dashboard');
const greetingText = document.getElementById('greetingText');
const logoutBtn = document.getElementById('logoutBtn');
const detailTitle = document.getElementById('detailTitle');
const detailBadge = document.getElementById('detailBadge');
const detailProgress = document.getElementById('detailProgress');
const detailTeacher = document.getElementById('detailTeacher');
const detailSchedule = document.getElementById('detailSchedule');
const detailSummary = document.getElementById('detailSummary');
const teacherLoginForm = document.getElementById('teacherLoginForm');
const teacherAuthScreen = document.getElementById('teacherAuthScreen');
const teacherDashboard = document.getElementById('teacherDashboard');
const teacherGreetingText = document.getElementById('teacherGreetingText');
const teacherLogoutBtn = document.getElementById('teacherLogoutBtn');
const APPROVED_ACCOUNTS_KEY = 'somavanzaApprovedAccounts';
const TEACHER_ACCOUNTS_KEY = 'somavanzaTeacherAccounts';
const ADMIN_ACCOUNTS_KEY = 'somavanzaAdminAccounts';
const ADMIN_LOGGED_IN_KEY = 'somavanzaAdminLoggedIn';
const ADMIN_NAME_KEY = 'somavanzaAdminName';
const ADMIN_TEACHERS_KEY = 'somavanzaAdminTeachers';
const PENDING_REQUESTS_KEY = 'somavanzaPendingRequests';
const SCHEDULED_LESSONS_KEY = 'somavanzaScheduledLessons';
const SCHEDULED_LESSONS_WEEK_KEY = 'somavanzaScheduledLessonsWeek';
const STUDENT_PROGRESS_REPORTS_KEY = 'somavanzaStudentProgressReports';
const TEACHER_HOMEWORK_KEY = 'somavanzaTeacherHomework';
const NOTIFICATIONS_KEY = 'somavanzaNotifications';
let currentPortalUser = null;
let teacherHomeworkCache = [];
let studentHomeworkCache = [];

async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    credentials: 'same-origin',
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : options.body,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || 'The server request failed.');
  return payload;
}

async function getServerSession() {
  try {
    const session = await apiRequest('/api/session');
    currentPortalUser = session.user;
    return session.user;
  } catch (error) {
    currentPortalUser = null;
    return null;
  }
}
const lessonDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const lessonSlots = [
  { id: '08:00', start: '8:00 AM', end: '9:30 AM', label: '8:00–9:30 AM' },
  { id: '10:00', start: '10:00 AM', end: '11:30 AM', label: '10:00–11:30 AM' },
  { id: '12:00', start: '12:00 PM', end: '1:30 PM', label: '12:00–1:30 PM' },
];
const accountRequestModal = document.getElementById('accountRequestModal');
const adminReviewModal = document.getElementById('adminReviewModal');
const approvalNotice = document.getElementById('approvalNotice');

function setGreeting() {
  if (!greetingText) return;

  const currentHour = new Date().getHours();
  let greeting = 'Good morning';

  if (currentHour >= 12 && currentHour < 17) greeting = 'Good afternoon';
  if (currentHour >= 17) greeting = 'Good evening';

  greetingText.textContent = greeting;
}

function renderSubjectPage() {
  const currentSubjectId = document.body.dataset.subject;
  if (!currentSubjectId) return;

  const subject = subjectLookup[currentSubjectId];
  if (!subject) return;

  const title = document.getElementById('subjectPageTitle');
  const badge = document.getElementById('subjectPageBadge');
  const progress = document.getElementById('subjectProgressValue');
  const teacher = document.getElementById('subjectTeacher');
  const schedule = document.getElementById('subjectNextClass');
  const summary = document.getElementById('subjectSummary');
  const topics = document.getElementById('subjectTopics');
  const pageCard = document.querySelector('.subject-score-panel');

  if (title) title.textContent = subject.name;
  if (badge) badge.textContent = subject.level;
  if (progress) progress.textContent = `${subject.progress}%`;
  if (teacher) teacher.textContent = `Teacher: ${getSubjectTeacherLabel(subject.name)}`;
  if (schedule) schedule.textContent = `Next class: ${subject.time}`;
  if (summary) summary.textContent = subject.summary;

  if (topics) {
    topics.innerHTML = subject.topics
      .map(
        (topic, index) => `
          <li class="resource-item">
            <span class="resource-number">0${index + 1}</span>
            <span>${topic}</span>
          </li>
        `
      )
      .join('');
  }

  if (pageCard) {
    pageCard.style.background = `linear-gradient(145deg, ${subject.accent}, rgba(95, 109, 255, 0.74))`;
  }
}

function buildSubjectCards() {
  if (!subjectGrid) return;

  subjectGrid.innerHTML = subjectData
    .map(
      (subject, index) => `
        <article class="subject-card ${index === 0 ? 'active' : ''}" data-subject="${subject.id}">
          <div class="subject-card-head">
            <span class="subject-icon" style="background: linear-gradient(135deg, ${subject.accent}, rgba(91, 99, 255, 0.6));">${subject.name.slice(0, 1)}</span>
            <span class="tag">${subject.level}</span>
          </div>
          <div>
            <h3>${subject.name}</h3>
            <p>${escapeHtml(getSubjectTeacherLabel(subject.name))}</p>
          </div>
          <div class="progress-label">
            <span>Progress</span>
            <strong>${subject.progress}%</strong>
          </div>
          <div class="progress-bar"><span style="width: ${subject.progress}%"></span></div>
        </article>
      `
    )
    .join('');

  const initialSubject = subjectData[0];
  const initialTeacher = document.getElementById('detailTeacher');
  if (initialSubject && initialTeacher) {
    initialTeacher.textContent = `Teacher: ${getSubjectTeacherLabel(initialSubject.name)}`;
  }

  document.querySelectorAll('.subject-card').forEach((card) => {
    card.addEventListener('click', () => {
      const selectedId = card.dataset.subject;
      const match = subjectData.find((subject) => subject.id === selectedId);
      if (!match) return;

      document.querySelectorAll('.subject-card').forEach((item) => item.classList.remove('active'));
      card.classList.add('active');

      const detailTitleElement = document.getElementById('detailTitle');
      const detailBadgeElement = document.getElementById('detailBadge');
      const detailProgressElement = document.getElementById('detailProgress');
      const detailTeacherElement = document.getElementById('detailTeacher');
      const detailScheduleElement = document.getElementById('detailSchedule');
      const detailSummaryElement = document.getElementById('detailSummary');

      if (!detailTitleElement || !detailBadgeElement || !detailProgressElement || !detailTeacherElement || !detailScheduleElement || !detailSummaryElement) return;

      detailTitleElement.textContent = match.name;
      detailBadgeElement.textContent = match.level;
      detailProgressElement.textContent = `${match.progress}%`;
      detailTeacherElement.textContent = `Teacher: ${getSubjectTeacherLabel(match.name)}`;
      detailScheduleElement.textContent = `Next class: ${match.time}`;
      detailSummaryElement.textContent = `${match.name} lessons focus on practical understanding, revision timing, and topic mastery with live mentor support.`;

      const ring = document.querySelector('.progress-ring');
      if (ring) {
        ring.style.background = `conic-gradient(${match.accent} 0 ${match.progress}%, rgba(91, 99, 255, 0.12) ${match.progress}% 100%)`;
      }

      if (window.location.pathname.toLowerCase().includes('dashboard.html')) {
        window.location.href = `${selectedId}.html`;
      }
    });
  });
}

function renderSubjectsPage() {
  const pageGrid = document.getElementById('subjectsPageGrid');
  if (!pageGrid) return;

  pageGrid.innerHTML = subjectData
    .map(
      (subject) => `
        <article class="subject-card">
          <div class="subject-card-head">
            <span class="subject-icon" style="background: linear-gradient(135deg, ${subject.accent}, rgba(91, 99, 255, 0.6));">${subject.name.slice(0, 1)}</span>
            <span class="tag">${subject.level}</span>
          </div>
          <div>
            <h3>${subject.name}</h3>
            <p>${escapeHtml(getSubjectTeacherLabel(subject.name))}</p>
          </div>
          <div class="progress-label">
            <span>Progress</span>
            <strong>${subject.progress}%</strong>
          </div>
          <div class="progress-bar"><span style="width: ${subject.progress}%"></span></div>
          <a class="join-btn subject-link" href="${subject.id}.html">View course</a>
        </article>
      `
    )
    .join('');
}

async function renderAssignmentsPage() {
  const assignmentList = document.getElementById('assignmentList');
  const assignmentCount = document.getElementById('assignmentCount');
  if (!assignmentList) return;

  try {
    if (!currentPortalUser) await getServerSession();
    studentHomeworkCache = await apiRequest('/api/homework');
  } catch (error) {
    assignmentList.innerHTML = `<div class="assignment-card"><strong>Unable to load homework</strong><p>${escapeHtml(error.message)}</p></div>`;
    if (assignmentCount) assignmentCount.textContent = '0 active';
    return;
  }

  const studentEmail = (currentPortalUser?.email || localStorage.getItem('somavanzaStudentEmail') || '').toLowerCase();
  const assignments = studentHomeworkCache.sort((left, right) => Date.parse(left.dueAt) - Date.parse(right.dueAt));
  const activeCount = assignments.filter((assignment) => Date.now() <= Date.parse(assignment.dueAt)).length;

  assignmentList.innerHTML = assignments.length
    ? assignments.map((assignment) => {
      const hasSubmission = Boolean(assignment.submittedAt);
      const dueAt = new Date(assignment.dueAt);
      const isPastDeadline = Date.now() > dueAt.getTime();
      let submissionStatus = '';

      if (hasSubmission) {
        const submittedAt = new Date(assignment.submittedAt).toLocaleString();
        submissionStatus = assignment.finalScore === null || assignment.finalScore === undefined
          ? `Submitted ${submittedAt} · +${assignment.bonusPoints} early bonus · Awaiting grade`
          : `Submitted ${submittedAt} · ${assignment.baseScore}% + ${assignment.bonusPoints} bonus = ${assignment.finalScore}% (${assignment.gradeBand})`;
      } else if (isPastDeadline) {
        submissionStatus = 'Deadline passed';
      } else if (!studentEmail) {
        submissionStatus = 'Sign in to record your submission';
      }

      return `
        <article class="assignment-card">
          <div class="assignment-header-row">
            <span class="tag">${escapeHtml(assignment.subject)}</span>
            <strong>${isPastDeadline ? 'Deadline passed' : 'Due soon'}</strong>
          </div>
          <h3>${escapeHtml(assignment.title)}</h3>
          <p>${escapeHtml(assignment.instructions)}</p>
          <div class="assignment-meta">
            <div>
              <span class="meta-label">Teacher</span>
              <strong>${escapeHtml(assignment.teacherName)}</strong>
            </div>
            <div>
              <span class="meta-label">Deadline</span>
              <strong>${dueAt.toLocaleString()}</strong>
            </div>
          </div>
          ${submissionStatus ? `<p class="homework-submission-status">${escapeHtml(submissionStatus)}</p>` : ''}
          <div class="assignment-actions">
            <a class="google-classroom" href="${escapeHtml(assignment.classroomUrl)}" target="_blank" rel="noopener noreferrer">Open in Google Classroom</a>
            ${hasSubmission ? '' : isPastDeadline ? '' : studentEmail
              ? `<button class="primary-btn" type="button" data-submit-homework="${escapeHtml(assignment.id)}">Record submission</button>`
              : '<button class="primary-btn" type="button" disabled>Sign in to submit</button>'}
          </div>
        </article>
      `;
    }).join('')
    : '<div class="assignment-card"><strong>No homework has been posted yet.</strong></div>';

  if (assignmentCount) assignmentCount.textContent = `${activeCount} active`;
}

function getTeacherHomework() {
  return teacherHomeworkCache;
}

function getHomeworkBonusPoints(createdAt, submittedAt) {
  const elapsedMilliseconds = Date.parse(submittedAt) - Date.parse(createdAt);
  const hourMilliseconds = 60 * 60 * 1000;
  if (!Number.isFinite(elapsedMilliseconds) || elapsedMilliseconds < 0 || elapsedMilliseconds >= 6 * hourMilliseconds) return 0;
  return 6 - Math.floor(elapsedMilliseconds / hourMilliseconds);
}

function setupStudentHomeworkSubmissions() {
  document.addEventListener('click', async (event) => {
    const submitButton = event.target.closest('[data-submit-homework]');
    if (!submitButton) return;

    if (currentPortalUser?.role !== 'student') {
      alert('Sign in before recording a homework submission.');
      return;
    }

    try {
      await apiRequest(`/api/homework/${encodeURIComponent(submitButton.dataset.submitHomework)}/submissions`, { method: 'POST' });
      await renderAssignmentsPage();
      await renderStudentHomeworkProgress();
    } catch (error) {
      alert(error.message);
    }
  });
}

async function renderStudentHomeworkProgress() {
  const list = document.getElementById('homeworkProgressList');
  if (!list) return;

  let progress;
  try {
    progress = await apiRequest('/api/student/progress');
  } catch (error) {
    list.innerHTML = `<div class="class-item"><div><strong>Unable to load homework progress</strong><small>${escapeHtml(error.message)}</small></div></div>`;
    return;
  }

  const subjectAverages = progress.subjects || [];
  const overallScore = progress.overallScore;
  const bestSubject = [...subjectAverages].sort((left, right) => right.score - left.score)[0];
  const overallElement = document.getElementById('homeworkOverallScore');
  const overallMeta = document.getElementById('homeworkOverallMeta');
  const bestSubjectElement = document.getElementById('homeworkBestSubject');
  const bestSubjectMeta = document.getElementById('homeworkBestSubjectMeta');
  const submittedCount = document.getElementById('homeworkSubmittedCount');

  if (overallElement) overallElement.textContent = overallScore === null ? '—' : `${overallScore}%`;
  if (overallMeta) overallMeta.textContent = overallScore === null ? 'No graded homework yet' : `${progress.gradedCount} graded homework`;
  if (bestSubjectElement) bestSubjectElement.textContent = bestSubject?.subject || '—';
  if (bestSubjectMeta) bestSubjectMeta.textContent = bestSubject ? `${bestSubject.score}% average` : 'No graded homework yet';
  if (submittedCount) submittedCount.textContent = String(progress.submittedCount || 0);

  list.innerHTML = subjectAverages.length
    ? subjectAverages.map((item) => `
      <div class="class-item">
        <div class="class-meta">
          <span class="dot math">${escapeHtml(item.subject.slice(0, 1))}</span>
          <div><strong>${escapeHtml(item.subject)}</strong><small>${item.averageScore}% homework average</small></div>
        </div>
        <div class="progress-bar" style="width: 180px;"><span style="width: ${item.averageScore}%"></span></div>
      </div>
    `).join('')
    : '<div class="class-item"><div><strong>No graded homework yet</strong><small>Graded homework will contribute to this progress summary.</small></div></div>';
}

function renderMaterialsPage() {
  const materialsGrid = document.getElementById('materialsGrid');
  const missedLessonsGrid = document.getElementById('missedLessonsGrid');

  if (!materialsGrid) return;

  const renderCards = (filter = 'all') => {
    const filtered = filter === 'all'
      ? materialData
      : materialData.filter((item) => {
          const normalizedFilter = filter.toLowerCase();
          return item.category.toLowerCase() === normalizedFilter ||
            item.subject.toLowerCase() === normalizedFilter ||
            item.type.toLowerCase().includes(normalizedFilter);
        });

    materialsGrid.innerHTML = filtered
      .map(
        (item) => `
          <article class="material-card">
            <div class="material-card-top">
              <span class="material-subject">${item.subject}</span>
              <span class="material-type">${item.type}</span>
            </div>
            <h3>${item.title}</h3>
            <p>Teacher: ${item.teacher}</p>
            <div class="material-meta">
              <span>${item.updated}</span>
            </div>
            <a class="material-link" href="${item.url}" target="_blank" rel="noreferrer">Open notes</a>
          </article>
        `
      )
      .join('');
  };

  const filterButtons = document.querySelectorAll('.filter-chip');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((chip) => chip.classList.remove('active'));
      button.classList.add('active');
      renderCards(button.dataset.filter);
    });
  });

  if (missedLessonsGrid) {
    missedLessonsGrid.innerHTML = recordedLessonData
      .map(
        (item) => `
          <article class="material-card">
            <div class="material-card-top">
              <span class="material-subject">${item.subject}</span>
              <span class="material-type">Recording</span>
            </div>
            <h3>${item.title}</h3>
            <p>Teacher: ${item.teacher}</p>
            <div class="material-meta">
              <span>${item.date}</span>
            </div>
            <a class="material-link" href="${item.url}" target="_blank" rel="noreferrer">Watch recording</a>
          </article>
        `
      )
      .join('');
  }

  renderCards();
}

function goToDashboard(studentName) {
  if (authScreen) authScreen.classList.add('hidden');
  if (dashboard) dashboard.classList.remove('hidden');
  if (greetingText) greetingText.textContent = `Good morning, ${studentName.split(' ')[0]}`;
}

function goToLoginScreen() {
  if (dashboard) dashboard.classList.add('hidden');
  if (authScreen) authScreen.classList.remove('hidden');
  localStorage.setItem('somavanzaLoggedIn', 'false');
}

function clearLegacyDemoAccounts() {
  const demoEmails = new Set(['student@somavanza.com', 'teacher@somavanza.com', 'admin@somavanza.com']);
  const demoIds = new Set(['demo-student', 'teacher-demo', 'admin-demo']);
  [APPROVED_ACCOUNTS_KEY, TEACHER_ACCOUNTS_KEY, ADMIN_ACCOUNTS_KEY, ADMIN_TEACHERS_KEY].forEach((key) => {
    const accounts = JSON.parse(localStorage.getItem(key) || '[]');
    if (!Array.isArray(accounts)) return;
    const remaining = accounts.filter((account) => !demoIds.has(account.id) && !demoEmails.has(String(account.email || '').toLowerCase()));
    if (remaining.length !== accounts.length) localStorage.setItem(key, JSON.stringify(remaining));
  });

  const teacherEmail = (localStorage.getItem('somavanzaTeacherEmail') || '').toLowerCase();
  if (demoEmails.has(teacherEmail)) {
    localStorage.removeItem('somavanzaTeacherLoggedIn');
    localStorage.removeItem('somavanzaTeacherName');
    localStorage.removeItem('somavanzaTeacherEmail');
    localStorage.removeItem('somavanzaTeacherSubject');
  }
}

function getApprovedAccounts() {
  return JSON.parse(localStorage.getItem(APPROVED_ACCOUNTS_KEY) || '[]')
    .filter((account) => account.id !== 'demo-student' && account.email?.toLowerCase() !== 'student@somavanza.com');
}

function getPendingRequests() {
  return JSON.parse(localStorage.getItem(PENDING_REQUESTS_KEY) || '[]');
}

function getScheduledLessons() {
  const currentWeek = getCurrentWeekStart();
  const savedWeek = localStorage.getItem(SCHEDULED_LESSONS_WEEK_KEY);
  if (!savedWeek) {
    localStorage.setItem(SCHEDULED_LESSONS_WEEK_KEY, currentWeek);
  } else if (savedWeek !== currentWeek) {
    localStorage.setItem(SCHEDULED_LESSONS_KEY, '[]');
    localStorage.setItem(SCHEDULED_LESSONS_WEEK_KEY, currentWeek);
  }
  return JSON.parse(localStorage.getItem(SCHEDULED_LESSONS_KEY) || '[]')
    .filter((lesson) => lesson.createdBy === 'admin');
}

function saveScheduledLessons(lessons) {
  if (lessons.length > lessonDays.length * lessonSlots.length) {
    throw new Error('A weekly timetable can contain no more than 15 lessons.');
  }
  const occupiedSlots = new Set();
  for (const lesson of lessons) {
    const key = `${lesson.day}|${lesson.slot}`;
    if (!lessonDays.includes(lesson.day) || !lessonSlots.some((slot) => slot.id === lesson.slot) || occupiedSlots.has(key)) {
      throw new Error('Weekly lessons must use unique weekday and time slots.');
    }
    occupiedSlots.add(key);
  }
  localStorage.setItem(SCHEDULED_LESSONS_KEY, JSON.stringify(lessons));
  localStorage.setItem(SCHEDULED_LESSONS_WEEK_KEY, getCurrentWeekStart());
}

function getCurrentWeekStart() {
  const date = new Date();
  const weekday = date.getDay();
  const daysSinceMonday = weekday === 0 ? 6 : weekday - 1;
  date.setDate(date.getDate() - daysSinceMonday);
  date.setHours(0, 0, 0, 0);
  return getLocalDateString(date);
}

function getLocalDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getCurrentWeekLabel() {
  const monday = new Date(`${getCurrentWeekStart()}T00:00:00`);
  const friday = new Date(monday);
  friday.setDate(friday.getDate() + 4);
  return `${monday.toLocaleDateString()} – ${friday.toLocaleDateString()}`;
}

function getTeacherAccount() {
  const email = (localStorage.getItem('somavanzaTeacherEmail') || '').toLowerCase();
  return JSON.parse(localStorage.getItem(TEACHER_ACCOUNTS_KEY) || '[]')
    .find((account) => account.email.toLowerCase() === email);
}

function getSubjectTeacherLabel(subjectName) {
  const normalizedSubject = normalizeTeacherSubject(subjectName);
  const teachers = JSON.parse(localStorage.getItem(TEACHER_ACCOUNTS_KEY) || '[]')
    .filter((account) => account.approvedAt && account.id !== 'teacher-demo' &&
      normalizeTeacherSubject(account.subject) === normalizedSubject)
    .map((account) => account.name)
    .filter((name, index, names) => name && names.indexOf(name) === index);
  return teachers.length ? teachers.join(', ') : 'Not assigned';
}

async function loadApprovedTeacherLabels() {
  try {
    const subjects = await apiRequest('/api/teachers/by-subject');
    const teachers = subjects.flatMap((item) => item.teachers.map((name) => ({
      id: `${normalizeTeacherSubject(item.subject)}-${name}`,
      name,
      subject: item.subject,
      approvedAt: true,
    })));
    localStorage.setItem(TEACHER_ACCOUNTS_KEY, JSON.stringify(teachers));
    buildSubjectCards();
    renderSubjectsPage();
    renderSubjectPage();
  } catch (error) {
    console.error('Unable to load approved teacher names.', error);
  }
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[character]));
}

function formatLessonTime(slotId) {
  return lessonSlots.find((slot) => slot.id === slotId)?.label || slotId;
}

function savePendingRequests(requests) {
  localStorage.setItem(PENDING_REQUESTS_KEY, JSON.stringify(requests));
}

function getNotifications() {
  return JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '[]');
}

function saveNotifications(notifications) {
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
}

function addNotification({ title, message, type = 'info', user = 'admin' }) {
  const notifications = getNotifications();
  const entry = {
    id: `notice-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`,
    title,
    message,
    type,
    user,
    createdAt: new Date().toISOString(),
  };

  notifications.unshift(entry);
  saveNotifications(notifications.slice(0, 15));
  renderAdminNotifications();
  renderStudentNotifications();
}

function renderAdminNotifications() {
  const list = document.getElementById('adminNotificationsList');
  if (!list) return;

  const notifications = getNotifications();
  if (!notifications.length) {
    list.innerHTML = '<div class="approval-item"><strong>No activity yet</strong><small>Admin actions and report notifications will appear here.</small></div>';
    return;
  }

  list.innerHTML = notifications
    .slice(0, 6)
    .map(
      (item) => `
        <div class="approval-item">
          <strong>${item.title}</strong>
          <small>${item.message}</small>
          <small>${new Date(item.createdAt).toLocaleString()}</small>
        </div>
      `
    )
    .join('');
}

function renderStudentNotifications() {
  const list = document.getElementById('studentNotificationList');
  if (!list) return;

  const notifications = getNotifications().filter((notification) => notification.user === 'student');
  if (!notifications.length) {
    list.innerHTML = '<div class="result-item"><div><strong>No new notifications</strong><small>Your student updates will appear here.</small></div></div>';
    return;
  }

  list.innerHTML = notifications
    .slice(0, 5)
    .map(
      (notification) => `
        <div class="result-item">
          <div>
            <strong>${notification.title}</strong>
            <small>${notification.message}</small>
          </div>
        </div>
      `
    )
    .join('');
}

function showApprovalNotice(message) {
  if (!approvalNotice) return;
  approvalNotice.textContent = message;
  approvalNotice.classList.remove('hidden');
  window.clearTimeout(showApprovalNotice.timer);
  showApprovalNotice.timer = window.setTimeout(() => {
    approvalNotice.classList.add('hidden');
  }, 3000);
}

async function renderAdminReviewList() {
  const reviewList = document.getElementById('adminReviewList');
  if (!reviewList) return;

  let pending;
  try {
    pending = (await apiRequest('/api/admin/requests')).filter((request) => request.type === 'student');
  } catch (error) {
    reviewList.innerHTML = `<div class="approval-item"><strong>Unable to load requests</strong><small>${escapeHtml(error.message)}</small></div>`;
    return;
  }

  if (!pending.length) {
    reviewList.innerHTML = '<div class="approval-item"><strong>No pending requests</strong><small>Approved or declined requests will appear here.</small></div>';
    return;
  }

  reviewList.innerHTML = pending
    .map(
      (request) => `
        <div class="approval-item">
          <strong>${escapeHtml(request.studentName)}</strong>
          <small>${escapeHtml(request.email)} · ${escapeHtml(request.grade)}</small>
          <small>Phone: ${escapeHtml(request.phone)} · M-Pesa: ${escapeHtml(request.mpesaRef)}</small>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button class="approve-btn" data-request-id="${escapeHtml(request.id)}">Accept</button>
            <button class="decline-btn" data-request-id="${escapeHtml(request.id)}">Decline</button>
          </div>
        </div>
      `
    )
    .join('');

  setupRequestDecisionButtons(reviewList, 'student');
}

async function renderAdminTeacherReviewList() {
  const reviewList = document.getElementById('adminTeacherReviewList');
  if (!reviewList) return;

  let pending;
  try {
    pending = (await apiRequest('/api/admin/requests')).filter((request) => request.type === 'teacher');
  } catch (error) {
    reviewList.innerHTML = `<div class="approval-item"><strong>Unable to load requests</strong><small>${escapeHtml(error.message)}</small></div>`;
    return;
  }
  if (!pending.length) {
    reviewList.innerHTML = '<div class="approval-item"><strong>No pending teacher requests</strong><small>New teacher registrations will appear here for review.</small></div>';
    return;
  }

  reviewList.innerHTML = pending
    .map(
      (request) => `
        <div class="approval-item">
          <strong>${escapeHtml(request.teacherName)}</strong>
          <small>${escapeHtml(request.email)} · Subject: ${escapeHtml(request.subject || 'Not selected')}</small>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button class="approve-btn" data-request-id="${escapeHtml(request.id)}">Approve teacher</button>
            <button class="decline-btn" data-request-id="${escapeHtml(request.id)}">Decline</button>
          </div>
        </div>
      `
    )
    .join('');

  setupRequestDecisionButtons(reviewList, 'teacher');
}

function setupRequestDecisionButtons(reviewList, requestType) {
  reviewList.querySelectorAll('.approve-btn, .decline-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      const requestId = encodeURIComponent(button.dataset.requestId);
      const approved = button.classList.contains('approve-btn');
      try {
        if (approved) {
          await apiRequest(`/api/admin/requests/${requestId}/approve`, { method: 'POST' });
        } else {
          await apiRequest(`/api/admin/requests/${requestId}`, { method: 'DELETE' });
        }
        showApprovalNotice(`${requestType === 'teacher' ? 'Teacher' : 'Student'} request ${approved ? 'approved' : 'declined'}.`);
        await renderAdminReviewList();
        await renderAdminTeacherReviewList();
        if (requestType === 'teacher' && approved) {
          await renderAdminTeacherList();
          populateClassTeacherSelect();
        }
        renderAdminOverviewStats();
      } catch (error) {
        alert(error.message);
      }
    });
  });
}

function renderStudentLessons() {
  const todayList = document.getElementById('todayLessonsList');
  const todayCount = document.getElementById('todayLessonCount');
  const weeklyList = document.getElementById('weeklyLessonsList');
  const weeklyCount = document.getElementById('weeklyLessonCount');
  const weeklyLabel = document.getElementById('weeklyTimetableWeek');
  const lessons = getTimetableLessons();
  const todayName = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(new Date());
  const todaysLessons = lessons.filter((lesson) => lesson.day === todayName);

  if (todayCount) todayCount.textContent = `${todaysLessons.length} ${todaysLessons.length === 1 ? 'lesson' : 'lessons'}`;
  if (todayList) {
    todayList.innerHTML = todaysLessons.length
      ? todaysLessons.map((lesson) => renderLessonCard(lesson)).join('')
      : '<div class="class-item"><div><strong>No lessons scheduled today</strong><small>Check My classes for the weekly timetable.</small></div></div>';
  }

  if (weeklyCount) weeklyCount.textContent = `${lessons.length} of 15 lessons`;
  if (weeklyLabel) weeklyLabel.textContent = `Current timetable: ${getCurrentWeekLabel()}. It refreshes automatically each Monday.`;
  if (weeklyList) {
    weeklyList.innerHTML = lessonDays.map((day) => {
        const dayLessons = lessons.filter((lesson) => lesson.day === day);
        return `
          <div class="schedule-day">
            <h3>${day}</h3>
            ${dayLessons.length
              ? dayLessons.map((lesson) => renderLessonCard(lesson)).join('')
              : '<div class="class-item"><div><strong>No lessons scheduled</strong><small>There are up to 3 lesson slots each day.</small></div></div>'}
          </div>
        `;
      }).join('');
  }
}

function renderLessonCard(lesson) {
  let externalLink = '';
  if (lesson.link) {
    try {
      const parsedLink = new URL(lesson.link, window.location.href);
      if (parsedLink.protocol === 'https:' || parsedLink.protocol === 'http:') {
        externalLink = `<a href="${escapeHtml(parsedLink.href)}" class="join-btn" target="_blank" rel="noopener noreferrer">Join</a>`;
      }
    } catch (error) {
      console.error('Unable to render the lesson link.', error);
    }
  }
  return `
    <div class="class-item">
      <div class="class-meta">
        <span class="dot">${escapeHtml(String(lesson.subject || 'L').slice(0, 1))}</span>
        <div>
          <strong>${escapeHtml(lesson.title)}</strong>
          <small>${escapeHtml(lesson.subject)} · ${escapeHtml(lesson.className)} · ${escapeHtml(lesson.teacher)} · ${escapeHtml(formatLessonTime(lesson.slot))}</small>
        </div>
      </div>
      ${externalLink}
    </div>
  `;
}

function getTimetableLessons() {
  return getScheduledLessons()
    .filter((lesson) => lesson.createdBy === 'admin' && lessonDays.includes(lesson.day) &&
      lessonSlots.some((slot) => slot.id === lesson.slot))
    .sort((left, right) => lessonDays.indexOf(left.day) - lessonDays.indexOf(right.day) ||
      lessonSlots.findIndex((slot) => slot.id === left.slot) - lessonSlots.findIndex((slot) => slot.id === right.slot));
}

function renderAdminTimetable() {
  const preview = document.getElementById('adminTimetablePreview');
  if (!preview) return;

  const lessons = getTimetableLessons();
  preview.innerHTML = `
    <p><strong>Week of ${escapeHtml(getCurrentWeekLabel())}</strong> · ${lessons.length} of 15 lessons scheduled</p>
    <div class="table-card timetable-table-wrap">
      <table class="timetable-table">
        <thead>
          <tr><th>Time</th>${lessonDays.map((day) => `<th>${day}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${lessonSlots.map((slot) => `
            <tr>
              <th>${slot.label}</th>
              ${lessonDays.map((day) => {
                const lesson = lessons.find((item) => item.day === day && item.slot === slot.id);
                return `<td>${lesson
                  ? `<strong>${escapeHtml(lesson.title)}</strong><small>${escapeHtml(lesson.subject)} · ${escapeHtml(lesson.className)}</small><small>${escapeHtml(lesson.teacher)}</small>`
                  : '<span class="timetable-empty">Available</span>'}</td>`;
              }).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function downloadAdminTimetable() {
  const lessons = getTimetableLessons();
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    alert('Your browser could not create the timetable image. Please try another browser.');
    return;
  }

  const labelWidth = 250;
  const columnWidth = 310;
  const headerHeight = 150;
  const rowHeight = 270;
  canvas.width = labelWidth + columnWidth * lessonDays.length;
  canvas.height = headerHeight + rowHeight * lessonSlots.length + 30;
  context.fillStyle = '#f5f7ff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#252f82';
  context.font = '700 38px Inter, Arial, sans-serif';
  context.fillText('Somavanza - Weekly Timetable', 36, 55);
  context.fillStyle = '#525c78';
  context.font = '20px Inter, Arial, sans-serif';
  context.fillText(`Week of ${getCurrentWeekLabel()} | 90-minute lessons | 30-minute breaks`, 36, 94);

  const tableTop = headerHeight;
  context.fillStyle = '#2d3ad8';
  context.fillRect(0, tableTop, labelWidth, 58);
  context.fillStyle = '#ffffff';
  context.font = '700 18px Inter, Arial, sans-serif';
  context.fillText('TIME', 22, tableTop + 36);
  lessonDays.forEach((day, index) => {
    const x = labelWidth + index * columnWidth;
    context.fillStyle = '#2d3ad8';
    context.fillRect(x, tableTop, columnWidth, 58);
    context.fillStyle = '#ffffff';
    context.fillText(day.toUpperCase(), x + 18, tableTop + 36);
  });

  lessonSlots.forEach((slot, rowIndex) => {
    const y = tableTop + 58 + rowIndex * rowHeight;
    context.fillStyle = '#e6eaff';
    context.fillRect(0, y, labelWidth, rowHeight);
    context.fillStyle = '#252f82';
    context.font = '700 18px Inter, Arial, sans-serif';
    context.fillText(slot.label, 18, y + 38);
    lessonDays.forEach((day, columnIndex) => {
      const x = labelWidth + columnIndex * columnWidth;
      context.fillStyle = '#ffffff';
      context.fillRect(x, y, columnWidth, rowHeight);
      context.strokeStyle = '#d9deef';
      context.strokeRect(x, y, columnWidth, rowHeight);
      const lesson = lessons.find((item) => item.day === day && item.slot === slot.id);
      if (!lesson) {
        context.fillStyle = '#7b8297';
        context.font = '16px Inter, Arial, sans-serif';
        context.fillText('Available', x + 18, y + 36);
        return;
      }

      context.fillStyle = '#252f82';
      context.font = '700 18px Inter, Arial, sans-serif';
      wrapCanvasText(context, lesson.title, x + 18, y + 38, columnWidth - 36, 24);
      context.fillStyle = '#4d5670';
      context.font = '16px Inter, Arial, sans-serif';
      wrapCanvasText(context, `${lesson.subject} · ${lesson.className}`, x + 18, y + 128, columnWidth - 36, 22);
      wrapCanvasText(context, `Teacher: ${lesson.teacher}`, x + 18, y + 182, columnWidth - 36, 22);
    });
  });

  const link = document.createElement('a');
  link.download = 'somavanza-weekly-timetable.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function wrapCanvasText(context, text, x, y, maxWidth, lineHeight) {
  const words = String(text || '').split(/\s+/);
  let line = '';
  let lineNumber = 0;
  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (line && context.measureText(candidate).width > maxWidth) {
      context.fillText(line, x, y + lineNumber * lineHeight);
      line = word;
      lineNumber += 1;
    } else {
      line = candidate;
    }
  });
  if (line) context.fillText(line, x, y + lineNumber * lineHeight);
}

async function initializeLoginState() {
  const currentPage = document.body.dataset.page || 'login';
  const user = await getServerSession();
  if (user?.role === 'student') loadApprovedTeacherLabels();

  if (loginForm) {
    if (user?.role === 'student') {
      window.location.href = 'dashboard.html';
    }
    if (authScreen) authScreen.classList.remove('hidden');
    return;
  }

  if (currentPage === 'dashboard') {
    if (user?.role !== 'student') {
      window.location.href = 'index.html';
      return;
    }

    const studentName = user.name || 'Student';
    if (greetingText) greetingText.textContent = `Good morning, ${studentName.split(' ')[0]}`;
  }
}

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email')?.value.trim();
    const password = document.getElementById('password')?.value;
    if (!email || !password) return;

    apiRequest('/api/auth/login', { method: 'POST', body: { email, password } })
      .then(({ user }) => {
        if (user.role !== 'student') {
          return apiRequest('/api/auth/logout', { method: 'POST' }).then(() => {
            throw new Error('Use the login page for your account type.');
          });
        }
        currentPortalUser = user;
        localStorage.setItem('somavanzaStudentName', user.name);
        localStorage.setItem('somavanzaStudentEmail', user.email);
        window.location.href = 'dashboard.html';
      })
      .catch((error) => alert(error.message));
  });
}

const openRequestModalBtn = document.getElementById('openRequestModalBtn');
const closeRequestModalBtn = document.getElementById('closeRequestModalBtn');
const accountRequestForm = document.getElementById('accountRequestForm');

if (openRequestModalBtn && accountRequestModal) {
  openRequestModalBtn.addEventListener('click', () => {
    accountRequestModal.classList.remove('hidden');
  });
}

if (closeRequestModalBtn && accountRequestModal) {
  closeRequestModalBtn.addEventListener('click', () => {
    accountRequestModal.classList.add('hidden');
  });
}

if (accountRequestForm) {
  accountRequestForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(accountRequestForm);
    const studentName = formData.get('studentName')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const password = formData.get('password')?.toString().trim();
    const phone = formData.get('phone')?.toString().trim();
    const grade = formData.get('grade')?.toString().trim();
    const mpesaRef = formData.get('mpesaRef')?.toString().trim();

    if (!studentName || !email || !password || !phone || !grade || !mpesaRef) {
      alert('Please complete all required fields.');
      return;
    }

    apiRequest('/api/student-requests', {
      method: 'POST',
      body: { studentName, email, password, phone, grade, mpesaRef },
    })
      .then(() => {
        accountRequestForm.reset();
        accountRequestModal.classList.add('hidden');
        showApprovalNotice('Your account request has been sent for approval.');
      })
      .catch((error) => alert(error.message));
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await apiRequest('/api/auth/logout', { method: 'POST' }).catch(() => {});
    currentPortalUser = null;
    localStorage.setItem('somavanzaLoggedIn', 'false');
    localStorage.removeItem('somavanzaStudentEmail');
    window.location.href = 'index.html';
  });
}

function getAdminTeachers() {
  return JSON.parse(localStorage.getItem(ADMIN_TEACHERS_KEY) || '[]');
}

function saveAdminTeachers(teachers) {
  localStorage.setItem(ADMIN_TEACHERS_KEY, JSON.stringify(teachers));
}

function populateClassTeacherSelect() {
  const subjectSelect = document.getElementById('adminClassForm')?.elements.classSubject;
  const teacherSelect = document.getElementById('classTeacherSelect');
  if (!subjectSelect || !teacherSelect) return;

  const subject = subjectSelect.value;
  const teachers = JSON.parse(localStorage.getItem(TEACHER_ACCOUNTS_KEY) || '[]')
    .filter((teacher) => teacher.subject?.toLowerCase() === subject.toLowerCase());
  teacherSelect.innerHTML = teachers.length
    ? teachers.map((teacher) =>
      `<option value="${escapeHtml(teacher.email)}">${escapeHtml(teacher.name)} (${escapeHtml(teacher.email)})</option>`
    ).join('')
    : '<option value="">No approved teacher for this subject</option>';
}

function renderAdminOverviewStats() {
  const teacherCount = document.getElementById('adminTeacherCount');
  const teacherMeta = document.getElementById('adminTeacherMeta');
  const classCount = document.getElementById('adminClassCount');
  const classMeta = document.getElementById('adminClassMeta');
  const studentCount = document.getElementById('adminStudentCount');
  const studentMeta = document.getElementById('adminStudentMeta');
  const requestCount = document.getElementById('adminRequestCount');
  const requestMeta = document.getElementById('adminRequestMeta');
  const attendanceScore = document.getElementById('adminAttendanceScore');
  const attendanceMeta = document.getElementById('adminAttendanceMeta');
  const newEnrollments = document.getElementById('adminNewEnrollments');
  const enrollmentMeta = document.getElementById('adminEnrollmentMeta');
  const assignmentScore = document.getElementById('adminAssignmentScore');
  const assignmentMeta = document.getElementById('adminAssignmentMeta');
  const performanceScore = document.getElementById('adminPerformanceScore');
  const performanceMeta = document.getElementById('adminPerformanceMeta');

  if (!teacherCount || !classCount || !studentCount || !requestCount || !performanceScore) return;

  const teacherList = getAdminTeachers();
  const classList = getTimetableLessons();
  const pendingList = getPendingRequests();
  const approvedList = getApprovedAccounts();

  const teacherTotal = teacherList.length || 3;
  const classTotal = classList.length;
  const studentTotal = approvedList.length || 1;
  const pendingTotal = pendingList.length;
  const averagePerformance = Math.min(96, Math.max(72, 78 + (studentTotal * 2) + (classTotal * 1.5) - (pendingTotal * 2)));
  const attendanceRate = Math.min(97, Math.max(82, 85 + classTotal - pendingTotal));
  const assignmentRate = Math.min(96, Math.max(70, 73 + studentTotal * 4 - pendingTotal));
  const enrollmentTotal = Math.max(2, studentTotal + 1);

  teacherCount.textContent = String(teacherTotal);
  teacherMeta.textContent = teacherTotal > 1 ? 'Current staff roster' : 'Staff member on duty';

  classCount.textContent = String(classTotal);
  classMeta.textContent = `${classTotal} live online sessions`;

  studentCount.textContent = String(studentTotal);
  studentMeta.textContent = studentTotal > 1 ? 'Approved student accounts' : 'Approved student account';

  requestCount.textContent = String(pendingTotal);
  requestMeta.textContent = pendingTotal > 0 ? 'Awaiting approval' : 'No pending approvals';

  attendanceScore.textContent = `${Math.round(attendanceRate)}%`;
  attendanceMeta.textContent = attendanceRate >= 90 ? 'Strong participation' : 'Needs watch';

  newEnrollments.textContent = String(enrollmentTotal);
  enrollmentMeta.textContent = 'This month';

  assignmentScore.textContent = `${Math.round(assignmentRate)}%`;
  assignmentMeta.textContent = assignmentRate >= 80 ? 'On-time submissions' : 'Follow-up needed';

  performanceScore.textContent = `${Math.round(averagePerformance)}%`;
  performanceMeta.textContent = pendingTotal > 0 ? 'School trend steady' : 'School trend strong';
}

async function renderAdminTeacherList() {
  const list = document.getElementById('adminTeacherList');
  if (!list) return;

  let entries;
  try {
    entries = await apiRequest('/api/admin/teachers');
  } catch (error) {
    list.innerHTML = `<div class="approval-item"><strong>Unable to load teachers</strong><small>${escapeHtml(error.message)}</small></div>`;
    return;
  }
  const cachedTeachers = entries.map((teacher) => ({ ...teacher, role: teacher.role || 'Teacher', approvedAt: teacher.approvedAt }));
  localStorage.setItem(TEACHER_ACCOUNTS_KEY, JSON.stringify(cachedTeachers));
  saveAdminTeachers(cachedTeachers);
  populateClassTeacherSelect();
  if (!entries.length) {
    list.innerHTML = '<div class="approval-item"><strong>No approved teachers yet</strong><small>Approved teacher accounts will appear here.</small></div>';
    return;
  }
  list.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Subject</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${entries
          .map(
            (teacher) => `
              <tr data-admin-teacher-id="${escapeHtml(teacher.id)}">
                <td><strong>${escapeHtml(teacher.name)}</strong></td>
                <td>${escapeHtml(teacher.role)}</td>
                <td>${escapeHtml(teacher.subject || 'Not assigned')}</td>
                <td>${escapeHtml(teacher.email)}</td>
                <td><span class="status-pill status-good">Active</span></td>
                <td><button class="tiny-btn delete-btn" type="button" data-delete-teacher="${escapeHtml(teacher.id)}">Delete</button></td>
              </tr>
            `
          )
          .join('')}
      </tbody>
    </table>
  `;

  list.querySelectorAll('[data-delete-teacher]').forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        await apiRequest(`/api/admin/teachers/${encodeURIComponent(button.dataset.deleteTeacher)}`, { method: 'DELETE' });
        await renderAdminTeacherList();
        populateClassTeacherSelect();
      } catch (error) {
        alert(error.message);
      }
    });
  });
}

function renderAdminClassList() {
  const list = document.getElementById('adminClassList');
  if (!list) return;

  const entries = getTimetableLessons();
  if (!entries.length) {
    list.innerHTML = '<div class="approval-item"><strong>No classes created for this week</strong><small>Use the form above to assign lessons and Google Meet links.</small></div>';
    return;
  }
  list.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Subject</th>
          <th>Class</th>
          <th>Teacher</th>
          <th>Day</th>
          <th>Time</th>
          <th>Meeting</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${entries
          .map(
            (schoolClass) => `
              <tr data-admin-class-id="${escapeHtml(schoolClass.id)}">
                <td>${escapeHtml(schoolClass.subject)}</td>
                <td><strong>${escapeHtml(schoolClass.className)}</strong></td>
                <td>${escapeHtml(schoolClass.teacher)}</td>
                <td>${escapeHtml(schoolClass.day)}</td>
                <td>${escapeHtml(formatLessonTime(schoolClass.slot))}</td>
                <td><a href="${escapeHtml(schoolClass.link)}" target="_blank" rel="noopener noreferrer">Open Meet</a></td>
                <td><button class="tiny-btn delete-btn" type="button" data-delete-class="${escapeHtml(schoolClass.id)}">Delete</button></td>
              </tr>
            `
          )
          .join('')}
      </tbody>
    </table>
  `;

  list.querySelectorAll('[data-delete-class]').forEach((button) => {
    button.addEventListener('click', () => {
      const classId = button.dataset.deleteClass;
      saveScheduledLessons(getScheduledLessons().filter((schoolClass) => String(schoolClass.id) !== String(classId)));
      renderAdminClassList();
      renderAdminTimetable();
      renderStudentLessons();
      renderTeacherSchedule();
      renderAdminOverviewStats();
    });
  });
}

function showAdminDashboard() {
  const adminAuthScreen = document.getElementById('adminAuthScreen');
  const adminDashboard = document.getElementById('adminDashboard');
  const pageShell = document.querySelector('.page-shell');

  if (adminAuthScreen) adminAuthScreen.classList.add('hidden');
  if (adminDashboard) adminDashboard.classList.remove('hidden');
  if (pageShell) pageShell.style.display = 'none';
}

async function initializeAdminAuth() {
  const adminLoginForm = document.getElementById('adminLoginForm');
  const adminAuthScreen = document.getElementById('adminAuthScreen');
  const adminDashboard = document.getElementById('adminDashboard');
  const adminGreetingText = document.getElementById('adminGreetingText');

  if (!adminLoginForm || !adminAuthScreen || !adminDashboard) return;

  const user = await getServerSession();
  const isAdminLoggedIn = user?.role === 'admin';
  localStorage.setItem(ADMIN_LOGGED_IN_KEY, String(isAdminLoggedIn));
  if (isAdminLoggedIn) localStorage.setItem(ADMIN_NAME_KEY, user.name);
  adminAuthScreen.classList.toggle('hidden', isAdminLoggedIn);
  adminDashboard.classList.toggle('hidden', !isAdminLoggedIn);

  const pageShell = document.querySelector('.page-shell');
  if (pageShell) {
    pageShell.style.display = isAdminLoggedIn ? 'none' : 'block';
  }

  const adminName = localStorage.getItem(ADMIN_NAME_KEY) || 'Admin';
  if (adminGreetingText) {
    const greeting = new Date().getHours() >= 12 ? 'Good afternoon' : 'Good morning';
    adminGreetingText.textContent = `${greeting}, ${adminName.split(' ')[0]}`;
  }
  if (isAdminLoggedIn) initializeAdminDashboard();
}

function setupAdminForms() {
  const adminTeacherForm = document.getElementById('adminTeacherForm');
  const adminClassForm = document.getElementById('adminClassForm');
  const classSubjectSelect = adminClassForm?.elements.classSubject;
  if (classSubjectSelect) classSubjectSelect.addEventListener('change', populateClassTeacherSelect);
  populateClassTeacherSelect();

  if (adminTeacherForm) {
    adminTeacherForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(adminTeacherForm);
      const teacherName = String(formData.get('teacherName') || '').trim();
      const teacherEmail = String(formData.get('teacherEmail') || '').trim();
      const teacherPassword = String(formData.get('teacherPassword') || '').trim();
      const teacherRole = String(formData.get('teacherRole') || 'Teacher').trim();
      const teacherSubject = String(formData.get('teacherSubject') || '').trim();

      if (!teacherName || !teacherEmail || !teacherPassword || !subjectData.some((subject) => subject.name === teacherSubject)) {
        alert('Enter the teacher details and select a valid teaching subject.');
        return;
      }

      apiRequest('/api/admin/teachers', {
        method: 'POST',
        body: { name: teacherName, email: teacherEmail, password: teacherPassword, subject: teacherSubject, staffTitle: teacherRole },
      })
        .then(async () => {
          adminTeacherForm.reset();
          await renderAdminTeacherList();
          populateClassTeacherSelect();
          alert('Teacher account added successfully.');
        })
        .catch((error) => alert(error.message));
    });
  }

  if (adminClassForm) {
    adminClassForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(adminClassForm);
      const subject = String(formData.get('classSubject') || '').trim();
      const name = String(formData.get('className') || '').trim();
      const teacherEmail = String(formData.get('classTeacher') || '').trim().toLowerCase();
      const day = String(formData.get('classDay') || '');
      const slot = String(formData.get('classSlot') || '');
      const link = String(formData.get('classLink') || '').trim();
      const teacher = JSON.parse(localStorage.getItem(TEACHER_ACCOUNTS_KEY) || '[]')
        .find((account) => account.email.toLowerCase() === teacherEmail);
      let meetUrl;
      try {
        meetUrl = new URL(link);
      } catch (error) {
        alert('Enter a valid Google Meet link.');
        return;
      }

      if (!teacher || teacher.subject?.toLowerCase() !== subject.toLowerCase()) {
        alert('Choose an approved teacher assigned to the selected subject.');
        return;
      }
      if (!lessonDays.includes(day) || !lessonSlots.some((item) => item.id === slot)) {
        alert('Choose a weekday and one of the three timetable slots.');
        return;
      }
      if (meetUrl.protocol !== 'https:' || !['meet.google.com', 'www.meet.google.com'].includes(meetUrl.hostname)) {
        alert('Enter a valid Google Meet link (https://meet.google.com/...).');
        return;
      }

      const lessons = getScheduledLessons();
      if (lessons.length >= lessonDays.length * lessonSlots.length) {
        alert('This week already has all 15 class slots scheduled. Refresh the timetable for a new week.');
        return;
      }
      if (lessons.some((lesson) => lesson.day === day && lesson.slot === slot)) {
        alert(`That time slot is already occupied on ${day}. Choose another slot.`);
        return;
      }

      lessons.push({
        id: `class-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`,
        subject,
        className: name,
        title: `${subject} · ${name}`,
        teacher: teacher.name,
        teacherEmail: teacher.email.toLowerCase(),
        day,
        slot,
        link: meetUrl.href,
        createdBy: 'admin',
        createdAt: new Date().toISOString(),
      });
      saveScheduledLessons(lessons);
      adminClassForm.reset();
      populateClassTeacherSelect();
      renderStudentLessons();
      renderTeacherSchedule();
      renderAdminClassList();
      renderAdminTimetable();
      renderAdminOverviewStats();
      const downloadTimetableBtn = document.getElementById('downloadTimetableBtn');
      if (downloadTimetableBtn) downloadTimetableBtn.disabled = false;
      alert('Class created. It is now visible on the assigned teacher and student timetables.');
    });
  }
}

if (document.getElementById('adminLoginForm')) {
  document.getElementById('adminLoginForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('adminEmail')?.value.trim();
    const password = document.getElementById('adminPassword')?.value.trim();

    if (!email || !password) return;

    apiRequest('/api/auth/login', { method: 'POST', body: { email, password } })
      .then(({ user }) => {
        if (user.role !== 'admin') {
          return apiRequest('/api/auth/logout', { method: 'POST' }).then(() => {
            throw new Error('Use the login page for your account type.');
          });
        }
        currentPortalUser = user;
        localStorage.setItem(ADMIN_LOGGED_IN_KEY, 'true');
        localStorage.setItem(ADMIN_NAME_KEY, user.name);
        showAdminDashboard();
        initializeAdminDashboard();
      })
      .catch((error) => alert(error.message));
  });
}

if (document.getElementById('adminLogoutBtn')) {
  document.getElementById('adminLogoutBtn').addEventListener('click', async () => {
    await apiRequest('/api/auth/logout', { method: 'POST' }).catch(() => {});
    localStorage.setItem(ADMIN_LOGGED_IN_KEY, 'false');
    localStorage.removeItem(ADMIN_NAME_KEY);
    const adminAuthScreen = document.getElementById('adminAuthScreen');
    const adminDashboard = document.getElementById('adminDashboard');
    if (adminAuthScreen) adminAuthScreen.classList.remove('hidden');
    if (adminDashboard) adminDashboard.classList.add('hidden');
    const pageShell = document.querySelector('.page-shell');
    if (pageShell) pageShell.style.display = 'block';
  });
}

function getStudentReportRecipients() {
  const approved = getApprovedAccounts();
  if (approved.length) {
    return approved.map((student) => ({
      id: student.id || `student-${student.email}`,
      name: student.name,
      email: student.email,
    }));
  }

  return [];
}

function getStudentProgressReports() {
  return JSON.parse(localStorage.getItem(STUDENT_PROGRESS_REPORTS_KEY) || '[]');
}

function saveStudentProgressReports(reports) {
  localStorage.setItem(STUDENT_PROGRESS_REPORTS_KEY, JSON.stringify(reports));
}

function buildHolidayProgressReport(student) {
  const studentSubjects = subjectData.map((subject, index) => {
    const score = Math.max(58, Math.min(96, subject.progress + ((index % 3) - 1) * 5));
    const trend = score >= 85 ? 'Strong' : score >= 72 ? 'Steady' : 'Needs focus';
    return { name: subject.name, score, trend };
  });

  const overall = Math.round(studentSubjects.reduce((sum, item) => sum + item.score, 0) / studentSubjects.length);
  const strongest = [...studentSubjects].sort((a, b) => b.score - a.score)[0];
  const weakest = [...studentSubjects].sort((a, b) => a.score - b.score)[0];

  return {
    id: `report-${Date.now()}`,
    studentName: student.name,
    email: student.email,
    reportType: 'Holiday progress report',
    generatedAt: new Date().toISOString(),
    overallScore: overall,
    summary: `${student.name} showed consistent academic effort throughout the term. The strongest area is ${strongest.name} while ${weakest.name} still needs extra revision support over the holiday break.`,
    subjects: studentSubjects,
  };
}

function renderAdminReportList() {
  const list = document.getElementById('adminReportList');
  if (!list) return;

  const reports = getStudentProgressReports();

  if (!reports.length) {
    list.innerHTML = '<div class="approval-item"><strong>No holiday reports sent yet.</strong><small>Generate a report for a student to send it to their portal.</small></div>';
    return;
  }

  list.innerHTML = reports
    .slice(0, 5)
    .map(
      (report) => `
        <div class="approval-item" style="margin-top: 12px;">
          <strong>${report.studentName}</strong>
          <div class="approval-meta">
            <span>${report.reportType}</span>
            <span>•</span>
            <span>${new Date(report.generatedAt).toLocaleDateString()}</span>
            <span>•</span>
            <span>${report.overallScore}% overall</span>
          </div>
          <small>${report.summary}</small>
        </div>
      `
    )
    .join('');
}

function downloadHolidayReport(report) {
  if (!report) return;

  const reportText = [
    'somavanza Holiday Summary Report',
    `Student: ${report.studentName}`,
    `Email: ${report.email || 'N/A'}`,
    `Generated: ${new Date(report.generatedAt).toLocaleString()}`,
    `Overall score: ${report.overallScore}%`,
    '',
    report.summary,
    '',
    'Subject breakdown:',
    ...report.subjects.map((subject) => `- ${subject.name}: ${subject.score}% (${subject.trend})`),
  ].join('\n');

  const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${report.studentName.toLowerCase().replace(/\s+/g, '-')}-holiday-report.txt`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function renderStudentProgressReports() {
  const list = document.getElementById('studentReportList');
  if (!list) return;

  const currentStudentEmail = (localStorage.getItem('somavanzaStudentEmail') || '').toLowerCase();
  const reports = getStudentProgressReports().filter((report) => {
    if (!currentStudentEmail) return true;
    return !report.email || report.email.toLowerCase() === currentStudentEmail;
  });

  if (!reports.length) {
    list.innerHTML = `
      <div class="result-item">
        <div>
          <strong>No holiday report available yet</strong>
          <small>Reports will appear here once the admin sends them to your portal.</small>
        </div>
      </div>
    `;
    return;
  }

  const latest = reports[0];
  list.innerHTML = `
    <div class="result-item" style="display:block; padding:16px;">
      <div style="margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; gap:12px;">
        <div>
          <strong>${latest.reportType}</strong>
          <small>Generated on ${new Date(latest.generatedAt).toLocaleDateString()}</small>
        </div>
        <button class="ghost-btn export-report-btn" type="button" data-export-report-id="${latest.id}">Export report</button>
      </div>
      <p style="margin:0 0 10px; color:#dfe7ff; line-height:1.6;">${latest.summary}</p>
      <div style="display:grid; gap:8px; margin-top:12px;">
        ${latest.subjects
          .map(
            (item) => `
              <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; padding:10px 12px; border-radius:10px; background: rgba(255,255,255,0.03); border:1px solid rgba(158,170,208,0.15);">
                <div>
                  <strong>${item.name}</strong>
                  <small style="display:block; color:#c9d9ff;">${item.trend}</small>
                </div>
                <span class="result-score good">${item.score}%</span>
              </div>
            `
          )
          .join('')}
      </div>
    </div>
  `;

  list.querySelectorAll('.export-report-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const reportId = button.dataset.exportReportId;
      const report = getStudentProgressReports().find((item) => item.id === reportId);
      downloadHolidayReport(report);
    });
  });
}

function populateStudentReportSelect() {
  const select = document.getElementById('studentReportSelect');
  if (!select) return;

  const recipients = getStudentReportRecipients();
  select.innerHTML = recipients
    .map(
      (student) => `<option value="${student.email}">${student.name} · ${student.email}</option>`
    )
    .join('');
}

function initializeAdminDashboard() {
  if (!document.getElementById('adminDashboard') || localStorage.getItem(ADMIN_LOGGED_IN_KEY) !== 'true') return;
  renderAdminOverviewStats();
  renderAdminTeacherList();
  renderAdminClassList();
  renderAdminReviewList();
  renderAdminTeacherReviewList();
  renderAdminReportList();
  renderAdminNotifications();
  populateStudentReportSelect();
  setupAdminForms();

  const generateTimetableBtn = document.getElementById('generateTimetableBtn');
  const downloadTimetableBtn = document.getElementById('downloadTimetableBtn');
  const refreshTimetableBtn = document.getElementById('refreshTimetableBtn');
  if (generateTimetableBtn) {
    generateTimetableBtn.addEventListener('click', () => {
      const lessons = getTimetableLessons();
      const occupiedSlots = new Set();
      const duplicate = lessons.find((lesson) => {
        const key = `${lesson.day}|${lesson.slot}`;
        if (occupiedSlots.has(key)) return true;
        occupiedSlots.add(key);
        return false;
      });
      if (duplicate) {
        alert(`The timetable has more than one lesson scheduled for ${duplicate.day} at ${formatLessonTime(duplicate.slot)}. Remove the conflicting lesson before generating it.`);
        return;
      }

      renderAdminTimetable();
      if (downloadTimetableBtn) downloadTimetableBtn.disabled = false;
    });
  }
  if (downloadTimetableBtn) {
    downloadTimetableBtn.addEventListener('click', downloadAdminTimetable);
  }
  if (refreshTimetableBtn) {
    refreshTimetableBtn.addEventListener('click', () => {
      const confirmed = window.confirm('Start this week with an empty timetable? This removes the current week’s scheduled lessons for this browser.');
      if (!confirmed) return;
      saveScheduledLessons([]);
      renderAdminTimetable();
      renderStudentLessons();
      renderTeacherSchedule();
      renderAdminClassList();
      renderAdminOverviewStats();
      if (downloadTimetableBtn) downloadTimetableBtn.disabled = false;
    });
  }
  if (document.getElementById('adminTimetablePreview')) {
    renderAdminTimetable();
    if (downloadTimetableBtn) downloadTimetableBtn.disabled = false;
  }

  const reportButton = document.getElementById('generateHolidayReportBtn');
  if (reportButton) {
    reportButton.addEventListener('click', () => {
      const reportForm = document.getElementById('studentHolidayReportForm');
      if (reportForm) {
        reportForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  const studentHolidayReportForm = document.getElementById('studentHolidayReportForm');
  if (studentHolidayReportForm) {
    studentHolidayReportForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const select = document.getElementById('studentReportSelect');
      const selectedEmail = select?.value || getStudentReportRecipients()[0]?.email;
      const selectedStudent = getStudentReportRecipients().find((student) => student.email === selectedEmail) || getStudentReportRecipients()[0];

      if (!selectedStudent) return;

      const report = buildHolidayProgressReport(selectedStudent);
      report.reportType = 'Holiday progress report';
      const reports = getStudentProgressReports();
      reports.unshift(report);
      saveStudentProgressReports(reports.slice(0, 10));

      addNotification({
        title: 'Holiday report sent',
        message: `The holiday summary for ${selectedStudent.name} has been sent to the student portal.`,
        type: 'success',
        user: 'student',
      });

      renderAdminReportList();
      renderStudentProgressReports();
      renderAdminNotifications();
      alert(`Holiday summary sent to ${selectedStudent.name}'s portal.`);
    });
  }
}

function applyTeacherDashboardLayout() {
  const dashboard = document.getElementById('teacherDashboard');
  const panel = document.querySelector('.content-panel');

  if (!dashboard || !panel) return;

  dashboard.style.height = '100vh';
  dashboard.style.minHeight = '100vh';
  dashboard.style.maxHeight = '100vh';

  panel.style.height = '100vh';
  panel.style.maxHeight = '100vh';
  panel.style.overflowY = 'auto';
}

function initializeTeacherRequestForm() {
  const modal = document.getElementById('teacherRequestModal');
  const openButton = document.getElementById('openTeacherRequestBtn');
  const closeButton = document.getElementById('closeTeacherRequestBtn');
  const requestForm = document.getElementById('teacherRequestForm');
  const notice = document.getElementById('teacherApprovalNotice');

  if (openButton && modal) openButton.addEventListener('click', () => modal.classList.remove('hidden'));
  if (closeButton && modal) closeButton.addEventListener('click', () => modal.classList.add('hidden'));
  if (!requestForm) return;

  requestForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(requestForm);
    const teacherName = String(formData.get('teacherName') || '').trim();
    const email = String(formData.get('teacherEmail') || '').trim();
    const password = String(formData.get('teacherPassword') || '').trim();
    const subject = String(formData.get('teacherSubject') || '').trim();
    if (!teacherName || !email || password.length < 6 || !subjectData.some((item) => item.name === subject)) {
      alert('Enter your name, a valid email, a password of at least 6 characters, and your subject.');
      return;
    }

    apiRequest('/api/teacher-requests', {
      method: 'POST',
      body: { teacherName, teacherEmail: email, teacherPassword: password, subject },
    })
      .then(() => {
        requestForm.reset();
        if (modal) modal.classList.add('hidden');
        if (notice) {
          notice.textContent = 'Your teacher account request has been sent for admin approval.';
          notice.classList.remove('hidden');
          window.setTimeout(() => notice.classList.add('hidden'), 4000);
        }
      })
      .catch((error) => alert(error.message));
  });
}

function renderTeacherSchedule() {
  const list = document.getElementById('teacherScheduledLessons');
  if (!list) return;
  const teacherEmail = (localStorage.getItem('somavanzaTeacherEmail') || '').toLowerCase();
  const teacherSubject = localStorage.getItem('somavanzaTeacherSubject') || getTeacherAccount()?.subject || '';
  const lessons = getTimetableLessons()
    .filter((lesson) => lesson.teacherEmail === teacherEmail &&
      lesson.subject.toLowerCase() === teacherSubject.toLowerCase())
    .sort((left, right) => lessonDays.indexOf(left.day) - lessonDays.indexOf(right.day) ||
      lessonSlots.findIndex((slot) => slot.id === left.slot) - lessonSlots.findIndex((slot) => slot.id === right.slot));

  list.innerHTML = `
    <p><strong>${escapeHtml(teacherSubject || 'No subject assigned')}</strong> classes assigned to you · ${lessons.length} this week</p>
    ${lessons.length ? lessons.map((lesson) => `
      <div class="resource-item-box">
        <div>
          <strong>${escapeHtml(lesson.day)} · ${escapeHtml(formatLessonTime(lesson.slot))} · ${escapeHtml(lesson.title)}</strong>
          <small>${escapeHtml(lesson.subject)} · ${escapeHtml(lesson.className)}</small>
        </div>
        ${renderMeetButton(lesson.link)}
      </div>
    `).join('')
      : '<div class="resource-item-box"><div><strong>No lessons scheduled for your subject</strong><small>Published lessons will appear here and on the student timetable.</small></div></div>'}
  `;
  renderTeacherTodayClasses(lessons);
}

function normalizeTeacherSubject(subject) {
  const normalized = String(subject || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  return normalized === 'mathematics' ? 'maths' : normalized;
}

function applyTeacherSubjectScope() {
  const subject = localStorage.getItem('somavanzaTeacherSubject') || '';
  const normalizedSubject = normalizeTeacherSubject(subject);
  const teacherName = localStorage.getItem('somavanzaTeacherName') || 'Teacher';

  document.querySelectorAll('#teacherUploadForm [name="subject"], #teacherVideoUploadForm [name="videoSubject"], #teacherHomeworkForm [name="subject"]').forEach((field) => {
    field.value = subject || 'No subject assigned';
  });
  document.querySelectorAll('#teacherUploadForm [name="teacher"], #teacherVideoUploadForm [name="videoTeacher"]').forEach((field) => {
    field.value = teacherName;
  });

  document.querySelectorAll('#noteUploadList [data-subject], #videoUploadList [data-subject], #teacherUploadList [data-subject]').forEach((item) => {
    item.hidden = !normalizedSubject || normalizeTeacherSubject(item.dataset.subject) !== normalizedSubject;
  });
  renderTeacherHomeworkList();
}

async function renderTeacherHomeworkList() {
  const list = document.getElementById('teacherHomeworkList');
  if (!list) return;

  if (currentPortalUser?.role !== 'teacher') {
    list.innerHTML = '<div class="assignment-card"><strong>Sign in to manage your subject homework.</strong></div>';
    return;
  }

  try {
    teacherHomeworkCache = await apiRequest('/api/teacher/homework');
  } catch (error) {
    list.innerHTML = `<div class="assignment-card"><strong>Unable to load homework</strong><p>${escapeHtml(error.message)}</p></div>`;
    return;
  }

  const assignments = teacherHomeworkCache.sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt));
  const homeworkCount = document.getElementById('teacherHomeworkCount');
  if (homeworkCount) homeworkCount.textContent = `${assignments.length} homework`;

  list.innerHTML = assignments.length
    ? assignments.map((assignment) => {
      const submissions = Array.isArray(assignment.submissions) ? assignment.submissions : [];
      const dueAt = new Date(assignment.dueAt).toLocaleString();
      const submissionList = submissions.length
        ? submissions.map((submission) => {
          const studentName = submission.studentName || submission.studentEmail;
          const gradeSummary = submission.finalScore === null || submission.finalScore === undefined
            ? `Awaiting grade · +${submission.bonusPoints} early bonus`
            : `${submission.baseScore}% + ${submission.bonusPoints} bonus = ${submission.finalScore}% (${submission.gradeBand})`;
          return `
            <div class="homework-submission">
              <div>
                <strong>${escapeHtml(studentName)}</strong>
                <small>${new Date(submission.submittedAt).toLocaleString()} · ${escapeHtml(gradeSummary)}</small>
              </div>
              <button class="tiny-btn primary-btn" type="button" data-grade-assignment="${escapeHtml(assignment.id)}" data-grade-student-id="${escapeHtml(submission.studentId)}" data-assignment-title="${escapeHtml(assignment.title)} · ${escapeHtml(studentName)}">${submission.finalScore === null || submission.finalScore === undefined ? 'Grade' : 'Update grade'}</button>
            </div>
          `;
        }).join('')
        : '<p class="homework-empty-submissions">No student submissions yet.</p>';

      return `
        <article class="assignment-card assignment-item" data-assignment-id="${escapeHtml(assignment.id)}" data-subject="${escapeHtml(assignment.subject)}">
          <div class="assignment-header-row">
            <span class="tag">${escapeHtml(assignment.subject)}</span>
            <strong>${submissions.length} submission${submissions.length === 1 ? '' : 's'}</strong>
          </div>
          <h3>${escapeHtml(assignment.title)}</h3>
          <p>${escapeHtml(assignment.instructions)}</p>
          <div class="assignment-meta">
            <div><span class="meta-label">Deadline</span><strong>${escapeHtml(dueAt)}</strong></div>
            <div><span class="meta-label">Submission window</span><strong>24 hours</strong></div>
          </div>
          <div class="assignment-actions">
            <a class="google-classroom" href="${escapeHtml(assignment.classroomUrl)}" target="_blank" rel="noopener noreferrer">Open Google Classroom</a>
          </div>
          <div class="homework-submissions-list">${submissionList}</div>
        </article>
      `;
    }).join('')
    : '<div class="assignment-card"><strong>No homework created for your subject yet.</strong></div>';
}

function initializeTeacherHomework() {
  const form = document.getElementById('teacherHomeworkForm');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (currentPortalUser?.role !== 'teacher' || !currentPortalUser.subject) {
      alert('Sign in with an assigned teaching subject before creating homework.');
      return;
    }

    const formData = new FormData(form);
    const title = String(formData.get('title') || '').trim();
    const instructions = String(formData.get('instructions') || '').trim();
    const classroomUrl = String(formData.get('classroomUrl') || '').trim();
    try {
      await apiRequest('/api/teacher/homework', {
        method: 'POST',
        body: { title, instructions, classroomUrl },
      });
      form.reset();
      applyTeacherSubjectScope();
      alert('Homework created. Students have 24 hours to submit.');
    } catch (error) {
      alert(error.message);
    }
  });

  renderTeacherHomeworkList();
}

function canTeacherAccessAssignment(assignment) {
  return currentPortalUser?.role === 'teacher' &&
    normalizeTeacherSubject(assignment?.dataset.subject) === normalizeTeacherSubject(currentPortalUser.subject);
}

function renderMeetButton(link) {
  if (!link) return '';
  try {
    const meetUrl = new URL(link);
    if (meetUrl.protocol !== 'https:' || !['meet.google.com', 'www.meet.google.com'].includes(meetUrl.hostname)) return '';
    return `<a class="join-btn" href="${escapeHtml(meetUrl.href)}" target="_blank" rel="noopener noreferrer">Join Google Meet</a>`;
  } catch (error) {
    console.error('Unable to render the Google Meet link.', error);
    return '';
  }
}

function renderTeacherTodayClasses(lessons) {
  const list = document.getElementById('teacherTodayClasses');
  if (!list) return;
  const todayName = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(new Date());
  const todaysLessons = lessons.filter((lesson) => lesson.day === todayName);
  list.innerHTML = todaysLessons.length
    ? todaysLessons.map((lesson) => renderLessonCard(lesson)).join('')
    : '<div class="class-item"><div><strong>No classes assigned today</strong><small>Check your weekly assigned classes above.</small></div></div>';
}

async function initializeTeacherAuth() {
  if (!teacherLoginForm || !teacherAuthScreen || !teacherDashboard) return;

  const user = await getServerSession();
  const isTeacherLoggedIn = user?.role === 'teacher';
  localStorage.setItem('somavanzaTeacherLoggedIn', String(isTeacherLoggedIn));
  if (isTeacherLoggedIn) {
    localStorage.setItem('somavanzaTeacherName', user.name);
    localStorage.setItem('somavanzaTeacherEmail', user.email);
    localStorage.setItem('somavanzaTeacherSubject', user.subject || '');
  } else {
    localStorage.removeItem('somavanzaTeacherName');
    localStorage.removeItem('somavanzaTeacherEmail');
    localStorage.removeItem('somavanzaTeacherSubject');
  }
  const pageShell = document.querySelector('.page-shell');
  teacherAuthScreen.classList.toggle('hidden', isTeacherLoggedIn);
  teacherDashboard.classList.toggle('hidden', !isTeacherLoggedIn);

  if (pageShell) {
    pageShell.style.display = isTeacherLoggedIn ? 'none' : 'block';
  }

  applyTeacherDashboardLayout();

  const teacherName = localStorage.getItem('somavanzaTeacherName') || 'Teacher';
  if (teacherGreetingText) {
    const greeting = new Date().getHours() >= 12 ? 'Good afternoon' : 'Good morning';
    teacherGreetingText.textContent = `${greeting}, ${teacherName.split(' ')[0]}`;
  }
  applyTeacherSubjectScope();
  renderTeacherSchedule();
}

if (teacherLoginForm) {
  teacherLoginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('teacherEmail')?.value.trim();
    const password = document.getElementById('teacherPassword')?.value;

    if (!email || !password) return;

    apiRequest('/api/auth/login', { method: 'POST', body: { email, password } })
      .then(({ user }) => {
        if (user.role !== 'teacher') {
          return apiRequest('/api/auth/logout', { method: 'POST' }).then(() => {
            throw new Error('Use the login page for your account type.');
          });
        }
        return initializeTeacherAuth();
      })
      .catch((error) => alert(error.message));
  });
}

if (teacherLogoutBtn) {
  teacherLogoutBtn.addEventListener('click', async () => {
    await apiRequest('/api/auth/logout', { method: 'POST' }).catch(() => {});
    currentPortalUser = null;
    localStorage.setItem('somavanzaTeacherLoggedIn', 'false');
    localStorage.removeItem('somavanzaTeacherName');
    localStorage.removeItem('somavanzaTeacherEmail');
    localStorage.removeItem('somavanzaTeacherSubject');
    if (teacherAuthScreen) teacherAuthScreen.classList.remove('hidden');
    if (teacherDashboard) teacherDashboard.classList.add('hidden');
    const pageShell = document.querySelector('.page-shell');
    if (pageShell) pageShell.style.display = 'block';
  });
}

function getTodayDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function initializeTeacherUpload() {
  const teacherUploadForm = document.getElementById('teacherUploadForm');
  const teacherUploadList = document.getElementById('teacherUploadList');
  const teacherVideoUploadForm = document.getElementById('teacherVideoUploadForm');
  const noteUploadList = document.getElementById('noteUploadList');
  const videoUploadList = document.getElementById('videoUploadList');
  const noteDateField = document.getElementById('noteDateField');
  const videoDateField = document.getElementById('videoDateField');

  if (noteDateField) noteDateField.value = getTodayDateString();
  if (videoDateField) videoDateField.value = getTodayDateString();

  if (teacherUploadForm) {
    teacherUploadForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(teacherUploadForm);
      const subject = localStorage.getItem('somavanzaTeacherSubject') || '';
      const title = formData.get('title');
      const type = formData.get('type');
      const teacher = localStorage.getItem('somavanzaTeacherName') || '';
      const noteFile = formData.get('noteFile');
      if (localStorage.getItem('somavanzaTeacherLoggedIn') !== 'true' || !subject) {
        alert('Sign in with an assigned teaching subject before uploading materials.');
        return;
      }
      const fileName = noteFile && noteFile.name ? noteFile.name : 'Uploaded file';

      const newItem = document.createElement('article');
      newItem.className = 'upload-item';
      newItem.dataset.subject = subject;
      newItem.innerHTML = `
        <div>
          <span class="upload-badge">${subject}</span>
          <h3>${title}</h3>
        </div>
        <div class="upload-meta">
          <small>${type}</small>
          <small>${teacher}</small>
        </div>
      `;

      if (teacherUploadList) {
        teacherUploadList.prepend(newItem);
      }

      if (noteUploadList) {
        const noteItem = document.createElement('div');
        noteItem.className = 'resource-item-box';
        noteItem.dataset.subject = subject;
        const extension = fileName.split('.').pop()?.toUpperCase() || 'FILE';
        noteItem.innerHTML = `
          <div>
            <strong>${title}</strong>
            <small>${subject} · ${type} · ${fileName}</small>
          </div>
          <span class="resource-pill">${extension}</span>
        `;
        noteUploadList.prepend(noteItem);
      }

      teacherUploadForm.reset();
      applyTeacherSubjectScope();
      if (noteDateField) noteDateField.value = getTodayDateString();
      alert('Note uploaded successfully.');
    });
  }

  if (teacherVideoUploadForm) {
    teacherVideoUploadForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(teacherVideoUploadForm);
      const subject = localStorage.getItem('somavanzaTeacherSubject') || '';
      const title = formData.get('videoTitle');
      const type = formData.get('videoType');
      const teacher = localStorage.getItem('somavanzaTeacherName') || '';
      const videoLink = formData.get('videoLink');
      const videoFile = formData.get('videoFile');
      const trimmedLink = videoLink ? String(videoLink).trim() : '';
      const fileName = videoFile && videoFile.name ? videoFile.name : '';
      const videoLabel = [trimmedLink, fileName].filter(Boolean).join(' · ') || 'Uploaded video';
      if (localStorage.getItem('somavanzaTeacherLoggedIn') !== 'true' || !subject) {
        alert('Sign in with an assigned teaching subject before uploading materials.');
        return;
      }

      if (videoUploadList) {
        const videoItem = document.createElement('div');
        videoItem.className = 'resource-item-box';
        videoItem.dataset.subject = subject;
        videoItem.innerHTML = `
          <div>
            <strong>${title}</strong>
            <small>${subject} · ${type} · ${videoLabel}</small>
          </div>
          <span class="resource-pill">Video</span>
        `;
        videoUploadList.prepend(videoItem);
      }

      teacherVideoUploadForm.reset();
      applyTeacherSubjectScope();
      if (videoDateField) videoDateField.value = getTodayDateString();
      alert('Video uploaded successfully.');
    });
  }

}

function getGradeBand(score) {
  const percentage = Number(score);
  if (Number.isNaN(percentage)) return 'E';

  if (percentage >= 80) return 'A';
  if (percentage >= 75) return 'A-';
  if (percentage >= 71) return 'B+';
  if (percentage >= 66) return 'B';
  if (percentage >= 61) return 'B-';
  if (percentage >= 56) return 'C+';
  if (percentage >= 51) return 'C';
  if (percentage >= 46) return 'C-';
  if (percentage >= 41) return 'D+';
  if (percentage >= 36) return 'D';
  if (percentage >= 31) return 'D-';
  return 'E';
}

function setupTeacherSidebarNavigation() {
  const navLinks = document.querySelectorAll('.nav-menu a[data-target]');
  const panel = document.querySelector('.content-panel');

  const setActiveLink = () => {
    const sections = Array.from(navLinks)
      .map((link) => document.getElementById(link.dataset.target))
      .filter(Boolean);

    const currentScroll = panel ? panel.scrollTop : window.scrollY;
    const activationPoint = currentScroll + (panel ? panel.clientHeight * 0.22 : 120);
    let activeTarget = sections[0]?.id || '';

    sections.forEach((section) => {
      if (section.offsetTop <= activationPoint) {
        activeTarget = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.target === activeTarget);
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.dataset.target;
      const target = document.getElementById(targetId);

      if (target) {
        if (panel) {
          panel.scrollTo({ top: target.offsetTop - 24, behavior: 'smooth' });
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      setActiveLink();
    });
  });

  if (panel) {
    panel.addEventListener('scroll', setActiveLink);
  }

  setActiveLink();
}

function setupTeacherAssignmentGrading() {
  const gradeModal = document.getElementById('gradeModal');
  const gradeModalTitle = document.getElementById('gradeModalTitle');
  const gradeInput = document.getElementById('gradeInput');
  const gradeResultBox = document.getElementById('gradeResultBox');
  const saveGradeBtn = document.getElementById('saveGradeBtn');

  if (!gradeModal || !gradeModalTitle || !gradeInput || !gradeResultBox || !saveGradeBtn) return;

  let activeAssignmentId = null;
  let activeStudentId = '';

  const updateLiveGradePreview = () => {
    const value = Number(gradeInput.value);
    if (!gradeInput.value || Number.isNaN(value) || value < 0 || value > 100) {
      gradeResultBox.textContent = 'Grade will appear here';
      gradeResultBox.style.background = '#ecfdf5';
      gradeResultBox.style.color = '#0f766e';
      return;
    }

    const assignment = getTeacherHomework().find((item) => item.id === activeAssignmentId);
    const submission = assignment?.submissions?.find((item) => item.studentId === activeStudentId);
    const bonusPoints = submission ? getHomeworkBonusPoints(assignment.createdAt, submission.submittedAt) : 0;
    const finalScore = Math.min(100, value + bonusPoints);
    gradeResultBox.textContent = `${value}% base + ${bonusPoints} bonus = ${finalScore}% · ${getGradeBand(finalScore)}`;
    gradeResultBox.style.background = '#ecfdf5';
    gradeResultBox.style.color = '#0f766e';
  };

  const closeModal = () => {
    gradeModal.classList.add('hidden');
    gradeInput.value = '';
    gradeResultBox.textContent = 'Grade will appear here';
    gradeResultBox.style.background = '#ecfdf5';
    gradeResultBox.style.color = '#0f766e';
    activeAssignmentId = null;
    activeStudentId = '';
  };

  document.addEventListener('click', (event) => {
    const targetButton = event.target.closest('[data-open-url]');
    if (targetButton) {
      const assignment = targetButton.closest('.assignment-item');
      if (assignment && !canTeacherAccessAssignment(assignment)) return;
      const url = targetButton.getAttribute('data-open-url');
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
      return;
    }

    const gradeTrigger = event.target.closest('[data-grade-assignment]');
    if (gradeTrigger) {
      const assignment = gradeTrigger.closest('.assignment-item');
      if (!canTeacherAccessAssignment(assignment)) return;
      activeAssignmentId = gradeTrigger.getAttribute('data-grade-assignment');
      activeStudentId = gradeTrigger.getAttribute('data-grade-student-id') || '';
      const title = gradeTrigger.getAttribute('data-assignment-title');
      gradeModalTitle.textContent = title || 'Assignment';
      const homework = getTeacherHomework().find((item) => item.id === activeAssignmentId);
      const submission = homework?.submissions?.find((item) => item.studentId === activeStudentId);
      gradeInput.value = submission?.baseScore ?? '';
      gradeModal.classList.remove('hidden');
      gradeInput.focus();
      updateLiveGradePreview();
      return;
    }

    if (event.target.closest('[data-close-grade]')) {
      closeModal();
    }
  });

  gradeInput.addEventListener('input', updateLiveGradePreview);

  saveGradeBtn.addEventListener('click', async () => {
    const value = Number(gradeInput.value);
    if (!gradeInput.value || Number.isNaN(value) || value < 0 || value > 100) {
      alert('Enter a valid percentage between 0 and 100.');
      return;
    }

    if (!activeAssignmentId || !activeStudentId) return;

    const assignmentRow = Array.from(document.querySelectorAll('.assignment-item')).find((item) => item.dataset.assignmentId === activeAssignmentId);
    if (!canTeacherAccessAssignment(assignmentRow)) {
      closeModal();
      alert('You can only grade assignments for your assigned subject.');
      return;
    }

    try {
      await apiRequest(`/api/teacher/homework/${encodeURIComponent(activeAssignmentId)}/submissions/${encodeURIComponent(activeStudentId)}`, {
        method: 'PATCH',
        body: { baseScore: value },
      });
      closeModal();
      await renderTeacherHomeworkList();
    } catch (error) {
      alert(error.message);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  clearLegacyDemoAccounts();
  setGreeting();
  buildSubjectCards();
  renderSubjectPage();
  renderSubjectsPage();
  renderAssignmentsPage();
  renderMaterialsPage();
  renderStudentLessons();
  renderStudentProgressReports();
  renderStudentHomeworkProgress();
  renderStudentNotifications();
  renderAdminNotifications();
  initializeTeacherUpload();
  initializeTeacherHomework();
  initializeTeacherRequestForm();
  initializeTeacherAuth();
  setupStudentHomeworkSubmissions();
  initializeAdminAuth();
  initializeLoginState();
  setupTeacherSidebarNavigation();
  setupTeacherAssignmentGrading();
  window.setInterval(() => {
    if (currentPortalUser?.role === 'teacher') renderTeacherHomeworkList();
    if (currentPortalUser?.role === 'student') {
      renderAssignmentsPage();
      renderStudentHomeworkProgress();
    }
  }, 20000);
});

window.addEventListener('storage', (event) => {
  if (event.key === SCHEDULED_LESSONS_KEY || event.key === SCHEDULED_LESSONS_WEEK_KEY) {
    renderStudentLessons();
    renderTeacherSchedule();
    renderAdminTimetable();
    renderAdminClassList();
    renderAdminOverviewStats();
  }
});
