import { useState, useEffect, useCallback } from 'react';
import { taskApi } from '../api/taskApi';
import type { Task, TaskRequest, TaskStatus } from '../types/task';

export function useTasks(projectId: number) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await taskApi.getByProject(projectId);
      setTasks(res.data);
    } catch {
      console.error('할 일 목록 조회 실패');
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (data: TaskRequest) => {
    const res = await taskApi.create(projectId, data);
    setTasks((prev) => [...prev, res.data]);
    return res.data;
  };

  const updateTask = async (id: number, data: TaskRequest) => {
    const res = await taskApi.update(id, data);
    setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
    return res.data;
  };

  const updateStatus = async (id: number, status: TaskStatus) => {
    const res = await taskApi.updateStatus(id, { status });
    setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
  };

  const deleteTask = async (id: number) => {
    await taskApi.remove(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const tasksByStatus = (status: TaskStatus) =>
    tasks.filter((t) => t.status === status);

  return {
    tasks,
    isLoading,
    fetchTasks,
    createTask,
    updateTask,
    updateStatus,
    deleteTask,
    tasksByStatus,
  };
}
