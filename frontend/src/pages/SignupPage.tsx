import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import styles from './SignupPage.module.css';

export function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signup({ username, email, password });
    if (success) {
      navigate('/login');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>TaskFlow</h1>
        <p className={styles.subtitle}>새 계정을 만드세요</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            id="username"
            label="이름"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="이름을 입력하세요"
            required
          />
          <Input
            id="email"
            label="이메일"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
          />
          <Input
            id="password"
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? '가입 중...' : '회원가입'}
          </Button>
        </form>
        <p className={styles.footer}>
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </p>
      </div>
    </div>
  );
}
