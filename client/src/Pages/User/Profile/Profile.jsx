import { useContext, useEffect, memo, useState } from "react";
import HeaderContent from "../../../Components/layoutContent/HeaderContent";
import { AuthContext } from "../../../Context/AuthContext";
import { UserContext } from "../../../Context/UserContext";
import styles from './Profile.module.css';
import { toast } from "react-toastify";

const Profile = () => {
  const { authState: { user } } = useContext(AuthContext);
  const { updateUserInfo, sendCode, setShowModalVerify } = useContext(UserContext);
  const [readOnly, setReadOnly] = useState(true);
  const [updatedButton, setUpdatedButton] = useState(false);

  const [userInfo, setUserInfo] = useState({
    fullName: "",
    username: "",
    email: ""
  });

  useEffect(() => {
    setUserInfo({
      fullName: user?.fullName || "",
      username: user?.username || "",
      email: user?.email || ""
    });
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const updateData = await updateUserInfo(userInfo);
      if(!updateData.status) {
        toast.error(updateData.message);
      } else {
        toast.success(updateData.message);
        setUpdatedButton(false);
        setReadOnly(true);
      }
    } catch (error) {
      toast.error('Server error');
    } 
  };

  const handleSendCode = async (e)=> {
    e.preventDefault();
    setShowModalVerify(true);
    setUpdatedButton(true);
    setReadOnly(false);
    try {
      const sendData = await sendCode({email: user?.email});
      if(!sendData.status) {
        toast.error(sendData.message);
      } else {
        toast.success(sendData.message);
      }
    } catch (error) {
      toast.error('Server error');
    }
  }

  const handleCancel = (event)=> {
    event.preventDefault();
    setUpdatedButton(false);
    setReadOnly(true);
  }

  const handleGoBack = () => {
    history.back();
  };

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
          <form className={styles.infoDetailForm} onSubmit={handleSave}>
            <div className='formElements'>
              <p className='label'>Full Name:</p>
              <input
                type="text"
                name="fullName"
                className={`formElementInput ${readOnly ? 'bgReadOnly' : ''}`}
                value={userInfo.fullName}
                onChange={handleChange}
                readOnly = {readOnly}
              />
            </div>
            <div className='formElements'>
              <p className='label'>Username:</p>
              <input
                type="text"
                name="username"
                className={`formElementInput ${readOnly ? 'bgReadOnly' : ''}`}
                value={userInfo.username}
                onChange={handleChange}
                readOnly = {readOnly}
              />
            </div>
            <div className='formElements'>
              <p className='label'>Email:</p>
              <input
                type="email"
                name="email"
                className={`formElementInput ${readOnly ? 'bgReadOnly' : ''}`}
                value={userInfo.email}
                onChange={handleChange}
                readOnly = {readOnly}
              />
            </div>
            <div className={styles.updateButtonContainer}>
              <button className={`${updatedButton ? 'd-none' : ''} primaryButton`} onClick={handleSendCode}>
                Update
              </button>
              <div className={`${updatedButton ? '' : 'd-none'}`}>
                <button className="cancelButton" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="primaryButton">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(Profile);
