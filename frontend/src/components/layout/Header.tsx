import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { Button } from '../common/Button';
import styles from './Header.module.css';

export function Header() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <Link to="/dashboard" className={styles.logo}>
        TaskFlow
      </Link>
      <div className={styles.right}>
        {user && <span className={styles.username}>{user.username}</span>}
        <Button variant="secondary" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
    </header>
  );
}
