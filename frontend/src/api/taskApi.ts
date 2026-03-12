import api from './axiosInstance';
import type { Task, TaskRequest, TaskStatusUpdateRequest } from '../types/task';

export const taskApi = {
  create: (projectId: number, data: TaskRequest) =>
    api.post<Task>(`/projects/${projectId}/tasks`, data),

  getByProject: (projectId: number) =>
    api.get<Task[]>(`/projects/${projectId}/tasks`),

  update: (id: number, data: TaskRequest) =>
    api.put<Task>(`/tasks/${id}`, data),

  updateStatus: (id: number, data: TaskStatusUpdateRequest) =>
    api.patch<Task>(`/tasks/${id}/status`, data),

  remove: (id: number) =>
    api.delete<void>(`/tasks/${id}`),
};
