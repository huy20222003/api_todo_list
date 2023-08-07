import React, { useState, useContext, memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchItem from '../../Form/SearchItem';
import { AuthContext } from '../../../Context/AuthContext';
import styles from './HeaderContent.module.css';

const HeaderContent = () => {
  const [subMenu, setSubMenu] = useState(false);
  const {
    authState: { user },
    logoutUser,
  } = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Link to="/dashboard" className={styles.logo}>
          Todo List
        </Link>
      </div>
      <div className={styles.searchContainer}>
        <SearchItem />
      </div>
      <div
        className={styles.userInfoContainer}
        onClick={() => setSubMenu(!subMenu)}
      >
        <img className={styles.userInfoImage} src={user?.avatar} alt="avatar" />
        <div>
          <span className={styles.userInfoName}>Hi, {user?.username}</span>
          <i className={`fa-solid fa-caret-down ${styles.caret}`}></i>
          <ul
            className={`${styles.subMenuContainer} ${subMenu ? '' : 'd-none'}`}
          >
            <li className={styles.subMenuItem}>
              <Link to="/dashboard" className={styles.subMenuItemLink}>
                <i
                  className={`fa-solid fa-house ${styles.subMenuItemIcon}`}
                ></i>
                <span className={styles.subMenuItemName}>Dashboard</span>
              </Link>
            </li>
            <li className={styles.subMenuItem}>
              <Link
                to="/dashboard/user/profile"
                className={styles.subMenuItemLink}
              >
                <i className={`fa-solid fa-user ${styles.subMenuItemIcon}`}></i>
                <span className={styles.subMenuItemName}>Account</span>
              </Link>
            </li>
            <li className={styles.subMenuItem}>
              <Link
                to="/dashboard/user/labels"
                className={styles.subMenuItemLink}
              >
                <i className={`fa-solid fa-tag ${styles.subMenuItemIcon}`}></i>
                <span className={styles.subMenuItemName}>Label</span>
              </Link>
            </li>
            <li className={styles.subMenuItem}>
              <Link
                to="/dashboard/user/setting"
                className={styles.subMenuItemLink}
              >
                <i className={`fa-solid fa-gear ${styles.subMenuItemIcon}`}></i>
                <span className={styles.subMenuItemName}>Settings</span>
              </Link>
            </li>
            <li className={styles.subMenuItem} onClick={handleLogout}>
              <Link to="/" className={styles.subMenuItemLink}>
                <i
                  className={`fa-solid fa-right-from-bracket ${styles.subMenuItemIcon}`}
                ></i>
                <span className={styles.subMenuItemName}>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(HeaderContent);
