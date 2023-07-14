import { useState, useContext, memo } from 'react';
import {toast} from 'react-toastify';
import HeaderContent from '../../../Components/layoutContent/HeaderContent';
import { UserContext } from '../../../Context/UserContext';
import styles from './Setting.module.css';
import { AuthContext } from '../../../Context/AuthContext';

const Setting = () => {
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [updatedButton, setUpdatedButton] = useState(false);

  const { oldPassword, newPassword, confirmPassword } = passwordForm;
  const {authState: {
    user
  }} = useContext(AuthContext);
  const {updatePasswords, setShowModalVerify, sendCode} = useContext(UserContext);

  const handleChangePasswordForm = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleChangePassword = async (e)=> {
    e.preventDefault();
    setShowModalVerify(true);
    setUpdatedButton(true);
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

  const handleSubmitPasswordForm = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.warn('Password is incorrect');
      return;
    }

    try {
        const updatePasswordData = await updatePasswords(passwordForm);
        if(!updatePasswordData.status) {
            toast.error('Password update failed');
        } else {
            toast.success('Password update successful');
        }
    } catch (error) {
        toast.error('Server error');
    }

    // Reset form sau khi đổi mật khẩu thành công
    setPasswordForm({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
  };

  const handleCancel = (event)=> {
    event.preventDefault();
    setUpdatedButton(false);
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
        <h1 className={styles.title}>Change Password</h1>
        <form className={styles.settingForm} onSubmit={handleChangePassword}>
          <div className={styles.settingFormItem}>
            <p className={styles.label}>Old Password:</p>
            <input
              type="password"
              name="oldPassword"
              value={oldPassword}
              onChange={handleChangePasswordForm}
              className={styles.settingFormInput}
              placeholder="Enter your old password"
            />
          </div>
          <div className={styles.settingFormItem}>
            <p className={styles.label}>New Password:</p>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handleChangePasswordForm}
              className={styles.settingFormInput}
              placeholder="Enter your new password"
            />
          </div>
          <div className={styles.settingFormItem}>
            <p className={styles.label}>Confirm Password:</p>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChangePasswordForm}
              className={styles.settingFormInput}
              placeholder="Confirm your new password"
            />
          </div>
          <div className={styles.changePasswordButtonContainer}>
            <button className={`${updatedButton ? 'd-none' : ''} primaryButton`}>
              Update
            </button>
            <div className={`${updatedButton ? '' : 'd-none'}`}>
              <button className="cancelButton" onClick={handleCancel}>
                Cancel
              </button>
              <button className="primaryButton" onClick={handleSubmitPasswordForm}>
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(Setting);
