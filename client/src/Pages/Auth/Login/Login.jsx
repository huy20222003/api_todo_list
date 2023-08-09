import { useState, useContext, useEffect, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { AuthContext } from '../../../Context/AuthContext';
import styles from './Login.module.css';
import FormInput from '../../../Components/Form/FormInput';
import Button from '../../../Components/Button';

function Login() {
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const { username, password } = loginForm;
  const { loginUser } = useContext(AuthContext);
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const navigate = useNavigate();

  const handleChangeLoginForm = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSubmitLoginForm = async (e) => {
    e.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        toast.error('Login failed!');
      } else {
        const expiration = new Date();
        expiration.setTime(expiration.getTime() + 15 * 60 * 1000);
        Cookies.set('user', loginData.accessToken, { expires: expiration });
        Cookies.set('refresh', loginData.refreshToken, { expires: 365 });
        toast.success('Logged in successfully!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Server error');
    } finally {
      setLoginForm({ username: '', password: '' });
    }
  };

  useEffect(() => {
    const updateBackground = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const second = now.getSeconds();
      const timeInterval = 24 / 7; // Divide the day into 7 intervals
      const intervalIndex = Math.floor(
        (hour * 60 + minute) / (timeInterval * 60)
      );
      const gradientColor = getGradientColor(intervalIndex);
      const newBackgroundStyle = {
        background: `linear-gradient(to bottom, ${gradientColor.start}, ${gradientColor.end})`,
      };
      setBackgroundStyle(newBackgroundStyle);
    };

    updateBackground(); // Update background on initial render
    const intervalId = setInterval(updateBackground, 1000); // Update background every 1 second

    return () => clearInterval(intervalId);
  }, []);

  const getGradientColor = (intervalIndex) => {
    // Define color schemes for different time intervals
    // Customize the colors based on your preferences
    switch (intervalIndex) {
      case 0: // 00:00 - 03:25
        return { start: '#000000', end: '#00008B' }; // Black to DarkBlue
      case 1: // 03:26 - 06:50
        return { start: '#00008B', end: '#4169E1' }; // DarkBlue to RoyalBlue
      case 2: // 06:51 - 10:15
        return { start: '#4169E1', end: '#00BFFF' }; // RoyalBlue to DeepSkyBlue
      case 3: // 10:16 - 13:40
        return { start: '#00BFFF', end: '#87CEEB' }; // DeepSkyBlue to SkyBlue
      case 4: // 13:41 - 17:05
        return { start: '#87CEEB', end: '#1E90FF' }; // SkyBlue to DodgerBlue
      case 5: // 17:06 - 20:30
        return { start: '#1E90FF', end: '#00CED1' }; // DodgerBlue to DarkTurquoise
      case 6: // 20:31 - 23:55
        return { start: '#00CED1', end: '#000000' }; // DarkTurquoise to Black
      default: // In case of unexpected value
        return { start: '#FFFFFF', end: '#FFFFFF' }; // White to White
    }
  };
  return (
    <div className={styles.container} style={backgroundStyle}>
      <form className={styles.formLogin} onSubmit={handleSubmitLoginForm}>
        <div className={styles.header}>
          <h1 className={styles.title}>Login</h1>
        </div>
        <div>
          <FormInput
            textName='username'
            type='text'
            icon='fa-solid fa-user'
            value={username.trim()}
            required={true}
            onChange={handleChangeLoginForm}
            placeholder='Enter your username'
          />
          <FormInput
            textName='password'
            type='password'
            icon='fa-solid fa-lock'
            value={password.trim()}
            required={true}
            onChange={handleChangeLoginForm}
            placeholder='Enter your password'
          />
          <div className={styles.forgotPassword}>
            <Link
              to="/user/reset-password"
              className={styles.forgotPasswordTitle}
            >
              Forgot password?
            </Link>
          </div>
        </div>
        <div className={styles.loginButtonContainer}>
          <Button
            textName='Login'
            type='submit'
            size='large'
            color='primary'
          />
        </div>
        <div>
          <span className={styles.loginFooterDescription}>
            Do not have an account?
          </span>
          <Link to="/auth/register" className={styles.loginFooterDirect}>
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default memo(Login);
