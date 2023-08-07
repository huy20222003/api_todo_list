import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Header from '../../../Components/layoutHome/Header';
import styles from './ResetPassword.module.css';
import { UserContext } from '../../../Context/UserContext';
import FormInput from '../../../Components/Form/FormInput';
import Button from '../../../Components/Button';

const ResetPassword = () => {
  const [emailReset, setEmailReset] = useState('');
  const { sendCode, setShowModalVerify } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChangeresetPasswordForm = (e) => {
    setEmailReset(e.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const resetData = await sendCode({ email: emailReset });
      Cookies.set('data', emailReset);
      if (!resetData.status) {
        toast.error('Email does not exist');
      } else {
        toast.success('Password reset email has been sent');
        navigate('/user/update-password');
        setShowModalVerify(true);
      }
    } catch (error) {
      toast.error('Server error');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <Header />
      </div>
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>Reset Password</h3>
        </div>
        <form className={styles.resetForm} onSubmit={handleResetPassword}>
          <FormInput
            textName="email"
            type="email"
            icon="fa-solid fa-envelope"
            onChange={handleChangeresetPasswordForm}
            value={emailReset}
            placeholder="Enter your old password"
          />
          <div className={styles.buttonContainer}>
            <Button
              textName="Save"
              type="submit"
              size="large"
              color="primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
