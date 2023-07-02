import { useContext } from "react";
import { Link } from "react-router-dom";
import HeaderContent from "../../../Components/layoutContent/HeaderContent";
import { AuthContext } from "../../../Context/AuthContext";
import styles from './Profile.module.css'

const Profile = () => {
  const { authState: { user }, logoutUser } = useContext(AuthContext);

  const handleLogout = ()=> {
    logoutUser();
  }

  const handleGoBack = ()=> {
    history.back();
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HeaderContent />
      </div>
      <div className={styles.content}>
        <div className={styles.backButtonContainer} onClick={handleGoBack}>
            <i className={`fa-solid fa-arrow-left ${styles.backButton}`}></i>
            <span className={styles.backButtonDescription}>Back</span>
        </div>
        <div className={styles.userInfoContainer}>
          <img src={user?.image} className={styles.userInfoImage} alt={user?.fullName} />
          <h2 className={styles.userInfoName}>{user?.fullName}</h2>
        </div>
        <div className={styles.infoDetailContainer}>
          <h1 className={styles.infoDetailTitle}>Information</h1>
          <form className={styles.infoDetailForm}>
            <div className={styles.infoDetailFormItem}>
              <p className={styles.label}>Full Name:</p>
              <input
                type="text"
                name="fullName"
                className={styles.infoDetailFormInput}
                value={user?.fullName}
                readOnly={true}
              />
            </div>
            <div className={styles.infoDetailFormItem}>
              <p className={styles.label}>Username:</p>
              <input
                type="text"
                name="username"
                className={styles.infoDetailFormInput}
                value={user?.username}
                readOnly={true}
              />
            </div>
            <div className={styles.infoDetailFormItem}>
              <p className={styles.label}>Email:</p>
              <input
                type="email"
                name="email"
                className={styles.infoDetailFormInput}
                value={user?.email}
                readOnly={true}
              />
            </div>
          </form>
          <div className={styles.logoutButtonContainer}>
            <Link to= '/'
              className={styles.logoutButton}
              onClick={handleLogout}
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
