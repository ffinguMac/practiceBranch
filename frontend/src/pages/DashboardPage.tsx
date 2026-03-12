import { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { ProjectCard } from '../components/project/ProjectCard';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import styles from './DashboardPage.module.css';

export function DashboardPage() {
  const { projects, isLoading, createProject } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await createProject({ name: name.trim(), description: description.trim() || undefined });
    setName('');
    setDescription('');
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <div className={styles.loading}>프로젝트 불러오는 중...</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>내 프로젝트</h1>
        <Button onClick={() => setIsModalOpen(true)}>+ 새 프로젝트</Button>
      </div>

      {projects.length === 0 ? (
        <div className={styles.empty}>
          <p>아직 프로젝트가 없습니다.</p>
          <p>새 프로젝트를 만들어 시작하세요!</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="새 프로젝트"
      >
        <form className={styles.form} onSubmit={handleCreate}>
          <Input
            id="project-name"
            label="프로젝트 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="프로젝트 이름을 입력하세요"
            required
          />
          <div className={styles.field}>
            <label htmlFor="project-desc" className={styles.label}>
              설명 (선택)
            </label>
            <textarea
              id="project-desc"
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="프로젝트 설명"
              rows={3}
            />
          </div>
          <Button type="submit">만들기</Button>
        </form>
      </Modal>
    </div>
  );
}
