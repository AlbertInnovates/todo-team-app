# 🧠 TeamTasker – Collaborative Todo Management App

A full-stack team productivity app designed to simplify task management and assignment in collaborative environments.

---

## 🚀 Core Value Proposition

> "Simplify team coordination and task tracking with secure authentication, real-time task updates, and an intuitive, responsive dashboard."

---

## 🛠️ Tech Stack

**Frontend:** React, React Router, Context API  
**Backend:** Node.js, Express.js, PostgreSQL (or SQLite)  
**Authentication:** JWT (with Refresh Tokens)  
**Deployment:** Vercel (Frontend), Railway (Backend)  
**Version Control:** Git + GitHub

---

## 📦 Project Structure

todo-team-app/
├── backend/
│ ├── index.js
│ ├── package.json
│ └── ... (controllers, routes, db)
└── frontend/
├── src/
├── public/
└── package.json


---

## ✨ Key Features

✅ Secure JWT Authentication  
✅ Create Personal and Team Tasks  
✅ Assign Tasks to Team Members  
✅ Task Completion Status  
✅ Deadline Tracking and Overdue Highlighting  
✅ RESTful API Design (15+ Endpoints)  
✅ Responsive Dashboard with Analytics  
✅ Protected Routes with React Router

---

## 🔐 Authentication Flow

- Register and login users with password hashing
- JWT issued on login and stored in localStorage
- Middleware to protect routes
- Logout and session expiration supported

---

## 🔄 API Overview

### `POST /api/auth/register`

Registers a new user.

```json 
{
  "name": "Jane",
  "email": "jane@example.com",
  "password": "SecurePass123"
}



POST /api/auth/login
Returns JWT access token and user data.

GET /api/tasks
Returns all tasks belonging to the user.

POST /api/tasks
Create a new task (optionally assign to team member).

PUT /api/tasks/:id
Update task details or reassign.

DELETE /api/tasks/:id
Delete a task owned by the user.

🧩 Database Schema
Users

id, name, email, password

Tasks

id, title, description, due_date, status, user_id, assigned_to, created_at

(You may include diagrams of this below using Figma or dbdiagram.io)

📊 Frontend UI Overview
React + Router for navigation

Context API or useState for user/token management

Pages:

Login / Register

Dashboard (My Tasks, Assigned Tasks)

Create / Edit Tasks

🧠 Problem-Solving Example
Problem: PostgreSQL connection failures during production deploys.
Solution:

Added connection pooling with retry logic

Added DB health-check endpoint

Improved error logging for easier debugging

📚 Learning Outcomes:

mindmap
  root((Learned))
    Backend
      JWT Authentication
      Express Routing
      PostgreSQL Integration
    Frontend
      React Auth Flow
      Dashboard Design
      Form Handling
    General
      Git Branching
      Project Deployment
      Documentation

💬 Contact Me:

📧 nisingizwe34@gmail.com
🌐 LinkedIn: NISINGIZWE ALBERT

📈 Project Metrics:

🧾 ~2,800+ Lines of Code

🌿 5 GitHub Branches

✅ 75% Backend Test Coverage

📘 15+ Pages of Documentation

⌛ Built in 7 Days (solo dev)

🧠 Future Enhancements:

🔔 Email notifications for tasks

🧑‍🤝‍🧑 Role-based access (Admin, Member)

📅 Calendar view of deadlines

📈 Analytics for team leaders

