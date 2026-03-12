import { useState, useEffect, useCallback } from 'react';
import { projectApi } from '../api/projectApi';
import type { Project, ProjectRequest } from '../types/project';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await projectApi.getAll();
      setProjects(res.data);
    } catch {
      console.error('프로젝트 목록 조회 실패');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = async (data: ProjectRequest) => {
    const res = await projectApi.create(data);
    setProjects((prev) => [...prev, res.data]);
    return res.data;
  };

  return { projects, isLoading, fetchProjects, createProject };
}
