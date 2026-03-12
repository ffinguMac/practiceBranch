import { useState } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import type { TaskRequest } from '../../types/task';
import styles from './TaskForm.module.css';

interface TaskFormProps {
  initialData?: Partial<TaskRequest>;
  onSubmit: (data: TaskRequest) => void;
  onCancel: () => void;
}

export function TaskForm({ initialData, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState(
    initialData?.description ?? '',
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), description: description.trim() || undefined });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        id="task-title"
        label="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="할 일 제목을 입력하세요"
        required
      />
      <div className={styles.field}>
        <label htmlFor="task-desc" className={styles.label}>
          설명
        </label>
        <textarea
          id="task-desc"
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="상세 설명 (선택)"
          rows={3}
        />
      </div>
      <div className={styles.actions}>
        <Button type="submit">저장</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          취소
        </Button>
      </div>
    </form>
  );
}
