import React from 'react';

function TaskItem({ task, onComplete, onDelete, onUpdate }) {
  const handleComplete = async () => {
    try {
      await onComplete(task.id);
      onUpdate();
    } catch (err) {
      console.error('Complete task error:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(task.id);
      onUpdate();
    } catch (err) {
      console.error('Delete task error:', err);
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        {task.due_date && (
          <p className="due-date">
            Due: {new Date(task.due_date).toLocaleDateString()}
          </p>
        )}
      </div>
      
      <div className="task-actions">
        {!task.completed && (
          <button onClick={handleComplete} className="btn-complete">
            ✓
          </button>
        )}
        <button onClick={handleDelete} className="btn-delete">
          🗑️
        </button>
      </div>
    </div>
  );
}