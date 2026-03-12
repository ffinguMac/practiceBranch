import type { Task } from '../../types/task';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: number) => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <div className={styles.card}>
      <h4 className={styles.title}>{task.title}</h4>
      {task.description && (
        <p className={styles.description}>{task.description}</p>
      )}
      <div className={styles.actions}>
        {onEdit && (
          <button className={styles.actionBtn} onClick={() => onEdit(task)}>
            수정
          </button>
        )}
        {onDelete && (
          <button
            className={`${styles.actionBtn} ${styles.deleteBtn}`}
            onClick={() => onDelete(task.id)}
          >
            삭제
          </button>
        )}
      </div>
    </div>
  );
}
