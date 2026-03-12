import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectApi } from '../api/projectApi';
import { useTasks } from '../hooks/useTasks';
import { TaskColumn } from '../components/task/TaskColumn';
import { TaskForm } from '../components/task/TaskForm';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import type { Project } from '../types/project';
import type { Task, TaskStatus } from '../types/task';
import styles from './ProjectDetailPage.module.css';

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);

  const [project, setProject] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const {
    isLoading,
    createTask,
    updateTask,
    updateStatus,
    deleteTask,
    tasksByStatus,
  } = useTasks(projectId);

  useEffect(() => {
    projectApi.getById(projectId).then((res) => setProject(res.data));
  }, [projectId]);

  const handleCreate = async (data: { title: string; description?: string }) => {
    await createTask(data);
    setIsFormOpen(false);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleUpdate = async (data: { title: string; description?: string }) => {
    if (!editingTask) return;
    await updateTask(editingTask.id, data);
    setEditingTask(null);
  };

  const handleStatusChange = async (taskId: number, status: TaskStatus) => {
    await updateStatus(taskId, status);
  };

  const handleDelete = async (taskId: number) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      await deleteTask(taskId);
    }
  };

  if (isLoading || !project) {
    return <div className={styles.loading}>불러오는 중...</div>;
  }

  const statuses: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DONE'];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link to="/dashboard" className={styles.back}>
            &larr; 대시보드
          </Link>
          <h1 className={styles.title}>{project.name}</h1>
          {project.description && (
            <p className={styles.description}>{project.description}</p>
          )}
        </div>
        <Button onClick={() => setIsFormOpen(true)}>+ 할 일 추가</Button>
      </div>

      <div className={styles.board}>
        {statuses.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasksByStatus(status)}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="새 할 일"
      >
        <TaskForm onSubmit={handleCreate} onCancel={() => setIsFormOpen(false)} />
      </Modal>

      <Modal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        title="할 일 수정"
      >
        {editingTask && (
          <TaskForm
            initialData={{
              title: editingTask.title,
              description: editingTask.description ?? '',
            }}
            onSubmit={handleUpdate}
            onCancel={() => setEditingTask(null)}
          />
        )}
      </Modal>
    </div>
  );
}
