import { useNavigate } from 'react-router-dom';
import type { Project } from '../../types/project';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/projects/${project.id}`)}
    >
      <h3 className={styles.name}>{project.name}</h3>
      {project.description && (
        <p className={styles.description}>{project.description}</p>
      )}
      <span className={styles.date}>
        {new Date(project.createdAt).toLocaleDateString('ko-KR')}
      </span>
    </div>
  );
}
