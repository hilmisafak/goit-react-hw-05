import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

function Navigation() {
  const getLinkClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>MovieScope</span>
          <span className={styles.tagline}>Discover your next favorite film</span>
        </div>
        <nav className={styles.nav}>
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>
          <NavLink to="/movies" className={getLinkClass}>
            Movies
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
