import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm';
import TaskItem from '../components/TaskItem';
import { getTasks, completeTask, deleteTask } from '../services/api';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Welcome, {user?.name}!</h1>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </header>

      <div className="task-actions">
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="btn-primary"
        >
          {showForm ? 'Cancel' : 'Add New Task'}
        </button>
      </div>

      {showForm && <TaskForm onTaskCreated={fetchTasks} />}

      <div className="task-list">
        <h2>Your Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks found. Create your first task!</p>
        ) : (
          tasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onComplete={completeTask}
              onDelete={deleteTask}
              onUpdate={fetchTasks}
            />
          ))
        )}
      </div>
    </div>
  );
}