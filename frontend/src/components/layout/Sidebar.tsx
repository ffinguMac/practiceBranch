import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          <span className={styles.icon}>&#9776;</span>
          대시보드
        </NavLink>
      </nav>
      <div className={styles.footer}>
        <span className={styles.version}>TaskFlow v0.1</span>
      </div>
    </aside>
  );
}
