import { useState, useContext, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Context/AuthContext';
import styles from './Register.module.css';

function Register() {
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isInputStarted, setIsInputStarted] = useState(false); // Thêm biến đánh dấu
  const [isInvalidPassword, setIsInvalidPassword] = useState(false); // Thêm biến kiểm tra mật khẩu không hợp lệ
  const [isValidEmail, setIsValidEmail] = useState(false);

  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { fullName, username, email, password, confirmPassword } = registerForm;

  const handleChangeRegisterForm = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    setIsInputStarted(true); // Đánh dấu khi người dùng bắt đầu nhập
    setIsInvalidPassword(e.target.value.length < 7); // Kiểm tra mật khẩu không hợp lệ
    const isValid = emailRegex.test(email);
    setIsValidEmail(isValid);
  };

  const handleSubmitRegisterForm = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.info('Passwords do not match!');
    } else {
      try {
        const registerData = await registerUser(registerForm);
        if (!registerData || !registerData.status) {
          toast.error('Registration failed!');
        } else {
          const expiration = new Date();
          expiration.setTime(expiration.getTime() + 180 * 60 * 1000);
          Cookies.set('user', registerData.accessToken, {
            expires: expiration,
          });
          toast.success('Successful account registration!');
          navigate('/auth/login');
          setRegisterForm({
            fullName: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
        }
      } catch (error) {
        toast.error('Server error');
      } finally {
        setIsInputStarted(false); // Đặt lại trạng thái khi gửi form
        setIsInvalidPassword(false); // Đặt lại trạng thái mật khẩu không hợp lệ
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formRegister} onSubmit={handleSubmitRegisterForm}>
        <div className={styles.header}>
          <h1 className={styles.title}>Register</h1>
        </div>
        <div>
          <div className="formElements">
            <span className="label">FullName:</span>
            <input
              type="text"
              name="fullName"
              value={fullName}
              required={true}
              onChange={handleChangeRegisterForm}
              className="formElementInput"
              placeholder="Enter your fullname"
            />
          </div>
          <div className="formElements">
            <span className="label">Username:</span>
            <input
              type="text"
              name="username"
              value={username}
              required={true}
              onChange={handleChangeRegisterForm}
              className="formElementInput"
              placeholder="Enter your username"
            />
          </div>
          <div className="formElements">
            <span className="label">Email:</span>
            <input
              type="email"
              name="email"
              value={email}
              required={true}
              onChange={handleChangeRegisterForm}
              className={`formElementInput ${
                isInputStarted && !isValidEmail ? 'formElementInputError' : ''
              }`}
              placeholder="Enter your email"
            />
          </div>
          <div className="formElements">
            <span className="label">Password:</span>
            <input
              type="password"
              name="password"
              value={password}
              required={true}
              onChange={handleChangeRegisterForm}
              className={`formElementInput ${
                isInputStarted && isInvalidPassword
                  ? 'formElementInputError'
                  : ''
              }`}
              placeholder="Password minimum 7 characters"
            />
          </div>
          <div className="formElements">
            <span className="label">Confirm Password:</span>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              required={true}
              onChange={handleChangeRegisterForm}
              className={`formElementInput ${
                isInputStarted && isInvalidPassword
                  ? 'formElementInputError'
                  : ''
              }`}
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
          <span className={styles.registerFooterDescription}>
            Do you already have an account?
          </span>
          <Link to="/auth/login" className={styles.registerFooterDirect}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default memo(Register);
