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
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const { signup, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const validate = (): boolean => {
    if (username.trim().length < 2) {
      setValidationError('이름은 2자 이상이어야 합니다.');
      return false;
    }
    if (password.length < 6) {
      setValidationError('비밀번호는 6자 이상이어야 합니다.');
      return false;
    }
    if (password !== passwordConfirm) {
      setValidationError('비밀번호가 일치하지 않습니다.');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const success = await signup({ username: username.trim(), email, password });
    if (success) {
      navigate('/login', { state: { signupSuccess: true } });
    }
  };

  const displayError = validationError || error;

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
            placeholder="이름을 입력하세요 (2자 이상)"
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
            placeholder="비밀번호 (6자 이상)"
            required
          />
          <Input
            id="passwordConfirm"
            label="비밀번호 확인"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="비밀번호를 다시 입력하세요"
            error={
              passwordConfirm && password !== passwordConfirm
                ? '비밀번호가 일치하지 않습니다.'
                : undefined
            }
            required
          />
          {displayError && <p className={styles.error}>{displayError}</p>}
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
