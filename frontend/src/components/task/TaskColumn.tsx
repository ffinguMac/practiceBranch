import type { Task, TaskStatus } from '../../types/task';
import { TaskCard } from './TaskCard';
import styles from './TaskColumn.module.css';

const STATUS_LABELS: Record<TaskStatus, string> = {
  TODO: '할 일',
  IN_PROGRESS: '진행 중',
  DONE: '완료',
};

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: number) => void;
  onStatusChange?: (taskId: number, status: TaskStatus) => void;
}

export function TaskColumn({
  status,
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskColumnProps) {
  const statusOptions: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DONE'];

  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <h3 className={styles.title}>{STATUS_LABELS[status]}</h3>
        <span className={styles.count}>{tasks.length}</span>
      </div>
      <div className={styles.list}>
        {tasks.map((task) => (
          <div key={task.id}>
            <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} />
            {onStatusChange && (
              <div className={styles.statusActions}>
                {statusOptions
                  .filter((s) => s !== status)
                  .map((s) => (
                    <button
                      key={s}
                      className={styles.statusBtn}
                      onClick={() => onStatusChange(task.id, s)}
                    >
                      {STATUS_LABELS[s]}으로 이동
                    </button>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
