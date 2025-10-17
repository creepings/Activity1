import React from 'react';
import { Task } from '../services/api';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number, completed: boolean) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onEdit, 
  onDelete, 
  onToggleComplete 
}) => {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        <small>Created: {new Date(task.createdAt).toLocaleDateString()}</small>
      </div>
      
      <div className="task-actions">
        <button
          onClick={() => onToggleComplete(task.id, !task.completed)}
          className={`btn ${task.completed ? 'btn-warning' : 'btn-success'}`}
        >
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        
        <button
          onClick={() => onEdit(task)}
          className="btn btn-primary"
        >
          Edit
        </button>
        
        <button
          onClick={() => onDelete(task.id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;