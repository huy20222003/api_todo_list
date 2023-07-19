import { useContext, useEffect, useRef, memo, useState } from "react";
import HeaderContent from "../../../Components/layoutContent/HeaderContent";
import { AuthContext } from "../../../Context/AuthContext";
import { UserContext } from "../../../Context/UserContext";
import styles from './Profile.module.css';
import { toast } from "react-toastify";

const Profile = () => {
  const { authState: { user } } = useContext(AuthContext);
  const { updateUserInfo, sendCode, setShowModalVerify, readOnly, setReadOnly, updatedButton, setUpdatedButton } = useContext(UserContext);
  const refInputFile = useRef();

  const [userInfo, setUserInfo] = useState({
    fullName: "",
    username: "",
    email: "",
    avatar: ""
  });

  useEffect(() => {
    setUserInfo({
      fullName: user?.fullName || "",
      username: user?.username || "",
      email: user?.email || "",
      avatar: user?.avatar || ""
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
      if (!updateData.status) {
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
    console.log(userInfo);
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

  const handleChooseFile = ()=> {
    refInputFile.current.click();
  }

  const handleChangeFile = async(e)=> {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        avatar: reader.result, // Update the avatar field with base64 data
      }));
    };


    if (file) {
      reader.readAsDataURL(file);
    }
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
          <div className={styles.avatarContainer}>
            <img src={userInfo.avatar} className={styles.userInfoImage} alt={user?.fullName} />
            <input type="file" ref={refInputFile} name="avatar" onChange={handleChangeFile} accept="image/*" hidden={true} />
            <i className="fa-solid fa-camera" onClick={handleChooseFile}></i>
          </div>
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
