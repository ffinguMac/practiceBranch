import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { useAuthContext } from '../context/AuthContext';
import styles from './LoginPage.module.css';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login: loginRequest, isLoading, error } = useAuth();
  const { login: setToken } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const signupSuccess = (location.state as { signupSuccess?: boolean })
    ?.signupSuccess;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await loginRequest({ email, password });
    if (token) {
      setToken(token);
      navigate('/dashboard');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>TaskFlow</h1>
        <p className={styles.subtitle}>로그인하여 시작하세요</p>
        {signupSuccess && (
          <p className={styles.success}>
            회원가입이 완료되었습니다. 로그인해 주세요!
          </p>
        )}
        <form className={styles.form} onSubmit={handleSubmit}>
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
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>
        </form>
        <p className={styles.footer}>
          계정이 없으신가요? <Link to="/signup">회원가입</Link>
        </p>
      </div>
    </div>
  );
}
