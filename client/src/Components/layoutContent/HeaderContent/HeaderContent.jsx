import { useState, useContext, memo } from 'react';
import { Link } from 'react-router-dom';
import { TodosContext } from '../../../Context/TodosContext';
import { AuthContext } from '../../../Context/AuthContext';
import styles from './HeaderContent.module.css';

const HeaderContent = () => {
  const [searchValue, setSearchValue] = useState('');
  const [subMenu, setSubMenu] = useState(false);
  const { searchTodos } = useContext(TodosContext);
  const { authState: { user }, logoutUser } = useContext(AuthContext);
  
  const handleSearchTodo = async (e) => {
    setSearchValue(e.target.value);
    try {
      const searchData = await searchTodos(e.target.value);
      if (!searchData.status) {
        console.log('An error has occurred');
      } else {
        // Xử lý dữ liệu sau khi tìm kiếm
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchTodo}
          className={styles.searchInput}
          placeholder="Search your Todo"
        />
      </div>
      <div className={styles.userInfoContainer} onClick={() => setSubMenu(!subMenu)}>
        <img className={styles.userInfoImage} src={user?.image} alt="avatar" />
        <div>
          <span className={styles.userInfoName}>Hi, {user?.username}</span>
          <i className={`fa-solid fa-caret-down ${styles.caret}`}></i>
          <ul
            className={`${styles.subMenuContainer} ${
              subMenu ? '' : 'd-none'
            }`}
          >
            <li className={styles.subMenuItem}>
              <Link to="/dashboard" className={styles.subMenuItemLink}>
                <i className={`fa-solid fa-house ${styles.subMenuItemIcon}`}></i>
                <span className={styles.subMenuItemName}>Dashboard</span>
              </Link>
            </li>
            <li className={styles.subMenuItem}>
              <Link to="/dashboard/user/profile" className={styles.subMenuItemLink}>
                <i className={`fa-solid fa-user ${styles.subMenuItemIcon}`}></i>
                <span className={styles.subMenuItemName}>Account</span>
              </Link>
            </li>
            <li className={styles.subMenuItem}>
              <Link to='/dashboard/user/setting' className={styles.subMenuItemLink}>
                <i className={`fa-solid fa-gear ${styles.subMenuItemIcon}`}></i>
                <span className={styles.subMenuItemName}>Settings</span>
              </Link>
            </li>
            <li className={styles.subMenuItem} onClick={handleLogout}>
              <Link to="/" className={styles.subMenuItemLink}>
                <i className={`fa-solid fa-right-from-bracket ${styles.subMenuItemIcon}`}></i>
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
