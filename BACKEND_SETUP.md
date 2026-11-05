# Online backend setup

The portal must be opened from the deployed HTTPS URL. Do not open `index.html` or `teacher.html` as a local file; browser sessions and database requests only work through the server.

## Hosting

Create a Neon Free PostgreSQL project and a Render Free web service. The free Render service may sleep after inactivity; Neon Free scales the database to zero after 5 minutes idle and includes 1 GB of storage and 100 compute-hours per month. This is a prototype setup, not an uptime-guaranteed production deployment.

Deploy this repository through Render's Blueprint flow using `render.yaml`:

Render deploys from a connected Git repository; it cannot deploy this local folder directly. Create a private GitHub repository and push the project files (excluding `node_modules/` and all `.env` files), then connect that repository in Render and select the Blueprint flow. This workspace currently has no Git repository or Git CLI installed.

- Build command: `npm install`
- Start command: `npm start`
- Compute plan: Free

Set these environment variables on the web service. Do not commit their values:

- `DATABASE_URL`: the hosted PostgreSQL connection URL
- `DATABASE_SSL`: `true` for Neon
- `SESSION_SECRET`: a unique random value of at least 32 bytes
- `BOOTSTRAP_ADMIN_EMAIL`: email for the first admin account
- `BOOTSTRAP_ADMIN_PASSWORD`: a strong password for the first admin account
- `BOOTSTRAP_ADMIN_NAME`: optional display name
- `NODE_ENV`: `production`

The bootstrap email defaults to `somavanza@gmail.com`; set it explicitly in the host dashboard to keep the deployment configuration visible. Enter the bootstrap password directly in the host dashboard. The server hashes it and inserts the account once; later deploys do not overwrite that account's password.

Generate a session secret locally with PowerShell:

```powershell
node -p "require('crypto').randomBytes(64).toString('hex')"
```

On first start, the server creates the account, homework, submission, and shared-session tables. The bootstrap admin can approve student and teacher requests and create teacher accounts. Later starts do not replace the bootstrap password.

## Local API development

Set the same environment variables in the PowerShell session, then run `npm start` and open `http://localhost:3000`. From PowerShell, use `npm.cmd` if the `npm` script launcher is blocked by execution policy.

Neon Free includes one manual snapshot and a six-hour restore history, but no scheduled backup service. Export important data regularly or upgrade before treating this as production school data. The application cannot start until a database URL and bootstrap admin settings are configured.