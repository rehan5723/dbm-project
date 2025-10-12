# SPPU Grade System — Backend

This repository contains the backend scaffold for the SPPU Grade System Calculator: a Node.js + Express API with route modules, placeholder controllers, and a MySQL connection pool.

This README focuses on the backend that currently lives in `backend/` and explains the project structure, environment variables, setup and run commands (PowerShell), testing tips, and suggested next steps.

## Quick summary

- Framework: Node.js + Express
- Database: MySQL (using `mysql2/promise` pool)
- Location: `d:\new\backend`

## Current project structure

```
backend/
├── controllers/
│   ├── authController.js       # auth stubs (register, login)
│   ├── facultyController.js    # faculty CRUD stubs
│   └── studentController.js    # student CRUD stubs
├── routes/
│   ├── auth.js                 # /auth routes
│   ├── faculty.js              # /faculty routes
│   └── student.js              # /student routes
├── db.js                       # MySQL pool (dotenv-enabled)
└── server.js                   # Express app entry
```

## Environment variables

Create a `.env` file in `d:\new` or `d:\new\backend` with these keys (adjust values):

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=app_db
DB_CONN_LIMIT=10
```

`backend/db.js` loads environment variables via `dotenv` and creates a `mysql2/promise` connection pool.

## Setup and run (PowerShell)

Open PowerShell in the repository root (`d:\new`).

1) Initialize package.json (if you don't have one yet) and install runtime + dev dependencies:

```powershell
npm init -y
npm install express mysql2 dotenv
npm install --save-dev nodemon
```

2) Recommended npm scripts — add or update `package.json` "scripts" section:

```json
"scripts": {
  "start": "node backend/server.js",
  "dev": "nodemon backend/server.js"
}
```

You can add those manually or I can create/modify `package.json` for you if you want.

3) Start the server

Run once (production style):

```powershell
npm run start
```

Run in development (auto-restart on change):

```powershell
npm run dev
```

4) Quick smoke tests

Open a new PowerShell window and use `curl.exe` (bundled on Windows) to test endpoints:

```powershell
# API root
curl.exe -Method GET http://localhost:3000/

# Faculty list
curl.exe -Method GET http://localhost:3000/faculty

# Register (JSON body example)
curl.exe -Method POST -Body (ConvertTo-Json @{name='Alice';email='a@example.com';password='pass'}) -ContentType 'application/json' http://localhost:3000/auth/register
```

Alternatively use Postman, Insomnia, or a browser for GET endpoints.

## How the pieces fit

- `server.js` mounts the three route modules: `/auth`, `/faculty`, `/student`.
- Controllers are currently stubs that return JSON; they are the right place to implement validation, full DB queries, and authentication logic.
- `db.js` exports the MySQL pool; require it in controllers to run queries, e.g. `const pool = require('../db'); const [rows] = await pool.query('SELECT ...');`

## Suggested next work items (I can implement any of these)

- Implement controller database queries (CRUD) and create a minimal SQL schema / migration script.
- Add authentication with JWT (login returns token, protected routes require token).
- Add request validation (express-validator or Joi) and password hashing (bcrypt).
- Create `package.json` scripts and a `.gitignore` (ignore `node_modules`, `.env`).
- Add basic tests (Jest or Mocha) and a CI workflow.

If you want, I can implement a complete example for one resource (students or faculty):
- Create SQL table schema
- Implement controllers with queries
- Add example requests and unit tests

Tell me which next task you want me to do and I will implement it and update the README accordingly.

---

*File edited:* `d:\new\README.md`
