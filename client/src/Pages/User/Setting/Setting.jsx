import { useState, useContext, memo, useEffect } from 'react';
import { toast } from 'react-toastify';
import HeaderContent from '../../../Components/layoutContent/HeaderContent';
import { UserContext } from '../../../Context/UserContext';
import styles from './Setting.module.css';
import { AuthContext } from '../../../Context/AuthContext';
import FormInput from '../../../Components/Form/FormInput';
import Button from '../../../Components/Button';

const Setting = () => {
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const storedIsChecked = localStorage.getItem('darkMode') === 'true';
  const [isChecked, setIsChecked] = useState(false);

  const { oldPassword, newPassword, confirmPassword } = passwordForm;
  const {
    authState: { user },
  } = useContext(AuthContext);
  const {
    updatePassword,
    setShowModalVerify,
    sendCode,
    updatedButton,
    setUpdatedButton,
  } = useContext(UserContext);

  const handleToggle = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    localStorage.setItem('darkMode', newChecked);
  };

  useEffect(()=> {
    const rootElement = document.documentElement;
    if(storedIsChecked) {
      rootElement.classList.add('darkMode');
    } else {
      rootElement.classList.remove('darkMode');
    }
  }, [storedIsChecked]);

  const handleChangePasswordForm = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    setShowModalVerify(true);
    try {
      const sendData = await sendCode({ email: user?.email });
      if (!sendData.success) {
        toast.error(sendData.message);
      } else {
        toast.success(sendData.message);
      }
    } catch (error) {
      toast.error('Server error');
    }
  };

  const handleSubmitPasswordForm = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.warn('Password is incorrect');
      return;
    }

    try {
      const updatePasswordData = await updatePassword(passwordForm);
      if (!updatePasswordData.success) {
        toast.error('Password update failed');
      } else {
        toast.success('Password update successful');
        setUpdatedButton(false);
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

  const handleCancel = (event) => {
    event.preventDefault();
    setUpdatedButton(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HeaderContent />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>Setting</h1>
        <div className={styles.ItemContainer}>
          <h2 className={styles.ItemTitle}>Theme</h2>
          <div className={styles.ItemButtonContainer}>
            <span>{storedIsChecked ? 'Light Mode' : 'Dark Mode'}</span>
            <label className= {styles.toggleSwitch}>
              <input type="checkbox"  checked = {storedIsChecked} onChange={handleToggle}/>
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
        <div className={styles.ItemContainer}>
          <h2 className={styles.ItemTitle}>Change Password</h2>
          <form
            className={styles.settingFormContainer}
            onSubmit={handleSubmitPasswordForm}
          >
            <FormInput
              textName={'oldPassword'}
              type={'password'}
              icon={'fa-solid fa-lock'}
              onChange={handleChangePasswordForm}
              value={oldPassword}
              placeholder={'Enter your old password'}
            />
            <FormInput
              textName={'newPassword'}
              type={'password'}
              icon={'fa-solid fa-lock'}
              onChange={handleChangePasswordForm}
              value={newPassword}
              placeholder={'Enter your new password'}
            />
            <FormInput
              textName={'confirmPassword'}
              type={'password'}
              icon={'fa-solid fa-lock'}
              onChange={handleChangePasswordForm}
              value={confirmPassword}
              placeholder={'Confirm your new password'}
            />
            <div className={styles.changePasswordButtonContainer}>
              {updatedButton ? (
                <Button
                  textName="Update"
                  type="button"
                  onClick={handleSendCode}
                  size="small"
                  color="primary"
                />
              ) : (
                <>
                  <Button
                    textName="Cancel"
                    type="button"
                    onClick={handleCancel}
                    size="small"
                    color="error"
                  />
                  <Button
                    textName="Save"
                    type="submit"
                    size="small"
                    color="primary"
                  />
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(Setting);
