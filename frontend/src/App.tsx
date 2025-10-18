import React, { useState, useEffect } from 'react';
import { taskAPI, Task, CreateTaskDto, UpdateTaskDto } from './services/api';
import TaskItem from './components/TaskItem';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getAllTasks();
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: CreateTaskDto) => {
    try {
      await taskAPI.createTask(taskData);
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    }
  };

  const handleUpdateTask = async (taskData: CreateTaskDto) => {
    if (!editingTask) return;
    
    try {
      await taskAPI.updateTask(editingTask.id, taskData);
      setEditingTask(null);
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.deleteTask(id);
        fetchTasks();
      } catch (err) {
        setError('Failed to delete task');
        console.error(err);
      }
    }
  };

  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      await taskAPI.updateTask(id, { completed });
      fetchTasks();
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  if (loading) return <div className="loading">Loading tasks...</div>;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo List Manager</h1>
        <button 
          onClick={() => setShowForm(true)} 
          className="btn btn-primary"
        >
          Add New Task
        </button>
      </header>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <main className="app-main">
        {tasks.length === 0 ? (
          <div className="no-tasks">
            <p>No tasks found. Create your first task!</p>
          </div>
        ) : (
          <div className="tasks-grid">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        )}
      </main>

      {showForm && (
        <TaskForm
          task={editingTask || undefined}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
}

export default App;