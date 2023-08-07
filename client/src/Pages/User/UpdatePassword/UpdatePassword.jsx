import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../../Components/layoutHome/Header';
import styles from './UpdatePassword.module.css';
import { UserContext } from '../../../Context/UserContext';
import FormInput from '../../../Components/Form/FormInput';
import Button from '../../../Components/Button';

const UpdatePassword = () => {
  const { updatePassword } = useContext(UserContext);
  const navigate = useNavigate();
  const [updateForm, setUpdateForm] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const { newPassword, confirmPassword } = updateForm;

  const handleChangeUpdatePasswordForm = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const handleUpdatePasswordAfterReset = async (e) => {
    e.preventDefault();
    if (newPassword != confirmPassword) {
      toast.info('Password incorrect!');
    } else {
      try {
        const updateData = await updatePassword(updateForm);
        if (!updateData.status) {
          toast.error('Your verification code has expired');
        } else {
          toast.success(updateData.message);
          navigate('/auth/login');
        }
      } catch (error) {
        toast.error('Server error');
      }
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
        <form
          className={styles.updateForm}
          onSubmit={handleUpdatePasswordAfterReset}
        >
          <FormInput
            textName="newPassword"
            type="password"
            icon="fa-solid fa-lock"
            onChange={handleChangeUpdatePasswordForm}
            value={newPassword}
            placeholder="Enter your new password"
          />
          <FormInput
            textName="conFirmPassword"
            type="password"
            icon="fa-solid fa-lock"
            onChange={handleChangeUpdatePasswordForm}
            value={confirmPassword}
            placeholder="Confirm your new password"
          />
          <div>
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

export default UpdatePassword;
