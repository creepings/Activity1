import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  completed?: boolean;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  completed?: boolean;
}

export const taskAPI = {
  // Get all tasks
  getAllTasks: () => api.get<Task[]>('/tasks'),
  
  // Get task by ID
  getTaskById: (id: number) => api.get<Task>(`/tasks/${id}`),
  
  // Create new task
  createTask: (task: CreateTaskDto) => api.post<Task>('/tasks', task),
  
  // Update task
  updateTask: (id: number, task: UpdateTaskDto) => api.patch<Task>(`/tasks/${id}`, task),
  
  // Delete task
  deleteTask: (id: number) => api.delete(`/tasks/${id}`),
};