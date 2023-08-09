import { useState, useContext, memo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Context/AuthContext';
import Cookies from 'js-cookie';
import styles from './Register.module.css';
import FormInput from '../../../Components/Form/FormInput';
import Button from '../../../Components/Button';

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
        if (!registerData.success) {
          toast.error('Registration failed!');
        } else {
          const expiration = new Date();
          expiration.setTime(expiration.getTime() + 15 * 60 * 1000);
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
      <form className={styles.formRegister} onSubmit={handleSubmitRegisterForm}>
        <div className={styles.header}>
          <h1 className={styles.title}>Register</h1>
        </div>
        <div>
          <FormInput
            textName='fullName'
            type='text'
            icon='fa-solid fa-user'
            value={fullName.trim()}
            required={true}
            onChange={handleChangeRegisterForm}
            placeholder='Enter your fullName'
          />
          <FormInput
            textName='username'
            type='text'
            icon='fa-solid fa-user'
            value={username.trim()}
            required={true}
            onChange={handleChangeRegisterForm}
            placeholder='Enter your username'
          />
          <FormInput
            textName='email'
            type='email'
            icon='fa-solid fa-envelope'
            value={email.trim()}
            required={true}
            onChange={handleChangeRegisterForm}
            placeholder='Enter your email'
          />
          <FormInput
            textName='password'
            type='password'
            icon='fa-solid fa-lock'
            value={password.trim()}
            required={true}
            onChange={handleChangeRegisterForm}
            placeholder='Enter your password'
          />
          <FormInput
            textName='confirmPassword'
            type='password'
            icon='fa-solid fa-lock'
            value={confirmPassword.trim()}
            required={true}
            onChange={handleChangeRegisterForm}
            placeholder='Enter your confirmPassword'
          />
        </div>
        <div className={styles.registerButtonContainer}>
          <Button
            textName='Register'
            type='submit'
            size='large'
            color='primary'
          />
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
