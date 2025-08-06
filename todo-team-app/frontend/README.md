🖥️ Frontend – Todo Team App
The frontend of the Todo Team App is built using React.js, offering a responsive, collaborative task management interface designed for teams and organizations. It focuses on ease of use, real-time updates, and task transparency within a shared workspace.

🔧 Tech Stack
React (with Hooks)

React Router DOM – for routing between login, dashboard, etc.

Axios – to communicate with the backend API

Tailwind CSS – for clean, modern UI styling

Context API – for global state management (auth, tasks)

💡 Key Features
Feature	Description
🔐 Authentication	Login and token handling using JWT (stored in localStorage)
📋 Task Management	Add, update, delete, and assign tasks to team members
👥 Team Collaboration	View tasks by all team members on a shared dashboard
📈 Status Tracking	Tasks can be marked as pending, in progress, or completed
🧭 Navigation	Clean navigation using React Router (Login, Dashboard, Profile, etc.)

🔐 Authentication Flow
On login, the frontend receives a JWT token from the backend and stores it in localStorage.

AuthContext manages access to protected routes.

Axios includes the token in headers for secure API calls.

🧩 Component Highlights
TaskCard.jsx – Displays each task with status and assigned user.

TeamBoard.jsx – Lists all tasks and allows real-time updates.

CreateTaskForm.jsx – Form to create new team tasks.

Navbar.jsx – Dynamic nav depending on user state.

