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

Registers a new user.POST /api/auth/login
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

📊 Frontend UI Overview
React + Router for navigation

Context API or useState for user/token management

Pages:

Login / Register

Dashboard (My Tasks, Assigned Tasks)

Create / Edit Tasks

🗓️ Development Timeline
Day	Focus
Day 1	Setup Backend & Frontend + Plan DB
Day 2	Backend Authentication
Day 3	Task CRUD + Assignment
Day 4	Frontend Auth & Routing
Day 5	Task Dashboard UI
Day 6	Team Assignments + Deadlines
Day 7	Testing + Deployment

🧠 Problem-Solving Example
Problem: PostgreSQL connection failures during production deploys.
Solution:

Added connection pooling with retry logic

Added DB health-check endpoint

Improved error logging for easier debugging

📚 Learning Outcomes
mermaid
Copy
Edit
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
      ---
      
📈 Project Metrics
🧾 ~2,800+ Lines of Code

🌿 5 GitHub Branches

✅ 75% Backend Test Coverage

📘 15+ Pages of Documentation

⌛ Built in 7 Days (solo dev)

🌍 Live Demo
Coming soon on:

Frontend – Vercel

Backend – Railway

📸 Visual Highlights
System Architecture Diagram


ER Diagram


UI Screenshots

Login	Dashboard	Task Form

📌 GitHub Repo
🔗 View Code on GitHub(https://github.com/AlbertInnovates/todo-team-app/edit/main/todo-team-app)

🧠 Future Enhancements
🔔 Email notifications for tasks

🧑‍🤝‍🧑 Role-based access (Admin, Member)

📅 Calendar view of deadlines

📈 Analytics for team leaders

```json
{
  "name": "Jane",
  "email": "jane@example.com",
  "password": "SecurePass123"
}
