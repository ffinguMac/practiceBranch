import api from './axiosInstance';
import type { Project, ProjectRequest } from '../types/project';

export const projectApi = {
  create: (data: ProjectRequest) =>
    api.post<Project>('/projects', data),

  getAll: () =>
    api.get<Project[]>('/projects'),

  getById: (id: number) =>
    api.get<Project>(`/projects/${id}`),
};
