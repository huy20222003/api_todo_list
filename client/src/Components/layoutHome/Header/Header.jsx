import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <>
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logo}>
          Todo List
        </Link>
      </div>
      <div className={styles.buttonContainer}>
        <Link to="/auth/login" className={styles.buttonItem}>
          <i
            className={`fa-solid fa-right-to-bracket ${styles.buttonItemIcon}`}
          ></i>
          <button className={styles.button}>Login</button>
        </Link>
        <Link to="/auth/register" className={styles.buttonItem}>
          <i className={`fa-solid fa-user ${styles.buttonItemIcon}`}></i>
          <button className={styles.button}>Register</button>
        </Link>
      </div>
    </>
  );
};

export default Header;
