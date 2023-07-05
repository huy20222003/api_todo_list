import { useState, useContext, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LOCAL_STORAGE_TOKEN_NAME } from '../../../constant';
import { AuthContext } from '../../../Context/AuthContext';
import styles from './Register.module.css';

function Register() {
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [isInputStarted, setIsInputStarted] = useState(false); // Thêm biến đánh dấu
  const [isInvalidPassword, setIsInvalidPassword] = useState(false); // Thêm biến kiểm tra mật khẩu không hợp lệ

  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { fullName, username, email, password, confirmPassword } = registerForm;

  const handleChangeRegisterForm = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    setIsInputStarted(true); // Đánh dấu khi người dùng bắt đầu nhập
    setIsInvalidPassword(e.target.value.length < 7); // Kiểm tra mật khẩu không hợp lệ
  };

  const handleSubmitRegisterForm = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.info('Password incorrect!');
    } 

    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.status) {
        toast.error('Register failed!');
      } else {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, registerData.accessToken);
        toast.success('Successful account registration!!');
        navigate('/auth/login');
      }
    } catch (error) {
      toast.error('Server error');
    }
    setRegisterForm({
      fullName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setIsInputStarted(false); // Đặt lại trạng thái khi gửi form
    setIsInvalidPassword(false); // Đặt lại trạng thái mật khẩu không hợp lệ
  };

  return (
    <div className={styles.container}>
      <form className={styles.formRegister} onSubmit={handleSubmitRegisterForm}>
        <div className={styles.header}>
          <h1 className={styles.title}>Register Form</h1>
        </div>
        <div>
          <div className='formElements'>
            <span className='label'>FullName:</span>
            <input
              type="text"
              name="fullName"
              value={fullName}
              required={true}
              onChange={handleChangeRegisterForm}
              className='formElementInput'
              placeholder="Enter your fullname"
            />
          </div>
          <div className='formElements'>
            <span className='label'>Username:</span>
            <input
              type="text"
              name="username"
              value={username}
              required={true}
              onChange={handleChangeRegisterForm}
              className= 'formElementInput'
              placeholder="Enter your username"
            />
          </div>
          <div className='formElements'>
            <span className='label'>Email:</span>
            <input
              type="email"
              name="email"
              value={email}
              required={true}
              onChange={handleChangeRegisterForm}
              className='formElementInput'
              placeholder="Enter your email"
            />
          </div>
          <div className='formElements'>
            <span className='label'>Password:</span>
            <input
              type="password"
              name="password"
              value={password}
              required={true}
              onChange={handleChangeRegisterForm}
              className={`formElementInput ${isInputStarted && isInvalidPassword ? styles.formElementInputError : ''}`}
              placeholder="Password minimum 7 characters"
            />
          </div>
          <div className='formElements'>
            <span className='label'>Confirm Password:</span>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              required={true}
              onChange={handleChangeRegisterForm}
              className={`formElementInput ${isInputStarted && isInvalidPassword ? styles.formElementInputError : ''}`}
              placeholder="Password minimum 7 characters"
            />
          </div>
        </div>
        <div className={styles.registerButtonContainer}>
          <button type="submit" className={styles.registerButton}>
            Register
          </button>
        </div>
        <div>
          <span className={styles.registerFooterDescription}>Do you already have an account?</span>
          <Link to="/auth/login" className={styles.registerFooterDirect}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default memo(Register);
