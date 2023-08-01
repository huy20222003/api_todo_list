import { useState, useContext, memo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Context/AuthContext';
import Cookies from 'js-cookie';
import styles from './Register.module.css';

function Register() {
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isInputStarted, setIsInputStarted] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [backgroundStyle, setBackgroundStyle] = useState({});

  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { fullName, username, email, password, confirmPassword } = registerForm;

  const handleChangeRegisterForm = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    setIsInputStarted(true);
    setIsInvalidPassword(e.target.value.length < 7);
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
        if (!registerData.status) {
          toast.error('Registration failed!');
        } else {
          const expiration = new Date();
          expiration.setTime(expiration.getTime() + 180 * 60 * 1000);
          Cookies.set('user', registerData.accessToken, {
            expires: expiration,
          });
          Cookies.set('refresh', registerData.refreshToken, { expires: 365 });
          toast.success('Successful account registration!!');
          navigate('/auth/login');
        }
      } catch (error) {
        toast.error('Server error');
      } finally {
        setIsInputStarted(false);
        setIsInvalidPassword(false);
        setRegisterForm({
          fullName: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      }
    }
  };

  useEffect(() => {
    const updateBackground = () => {
      const now = new Date();
      const hour = now.getHours();
      const gradientColor = getGradientColor(hour);
      const newBackgroundStyle = {
        background: `linear-gradient(to bottom, ${gradientColor.start}, ${gradientColor.end})`,
      };
      setBackgroundStyle(newBackgroundStyle);
    };

    updateBackground(); 
    const intervalId = setInterval(updateBackground, 6000);

    return () => clearInterval(intervalId);
  }, []);

  const getGradientColor = (hour) => {
    if (hour >= 6 && hour < 12) {
      return { start: '#f0e68c', end: '#ffa500' };
    } else if (hour >= 12 && hour < 18) {
      return { start: '#ffa500', end: '#ff4500' };
    } else {
      return { start: '#87cefa', end: '#8a2be2' };
    }
  };

  return (
    <div className={styles.container} style={backgroundStyle}>
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
