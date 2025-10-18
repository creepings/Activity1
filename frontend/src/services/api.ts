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
  // pang kuhan ng lahat ng tasks
  getAllTasks: () => api.get<Task[]>('/tasks'),
  
  // pang kuha ng id ng task
  getTaskById: (id: number) => api.get<Task>(`/tasks/${id}`),
  
  // pang gawa ng task
  createTask: (task: CreateTaskDto) => api.post<Task>('/tasks', task),
  
  // pang update ng task
  updateTask: (id: number, task: UpdateTaskDto) => api.patch<Task>(`/tasks/${id}`, task),
  
  // pang delete ng task
  deleteTask: (id: number) => api.delete(`/tasks/${id}`),
};