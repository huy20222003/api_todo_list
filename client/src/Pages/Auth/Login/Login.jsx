import { useState, useContext, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { AuthContext } from '../../../Context/AuthContext';
import styles from './Login.module.css';

function Login() {
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const { username, password } = loginForm;
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChangeLoginForm = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSubmitLoginForm = async (e) => {
    e.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.status) {
        toast.error('Login failed!');
      } else {
        const expiration = new Date();
        expiration.setTime(expiration.getTime() + 180 * 60 * 1000);
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

  return (
    <div className={styles.container}>
      <form className={styles.formLogin} onSubmit={handleSubmitLoginForm}>
        <div className={styles.header}>
          <h1 className={styles.title}>Login</h1>
        </div>
        <div>
          <div className="formElements">
            <span className="label">Username:</span>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChangeLoginForm}
              className="formElementInput"
              placeholder="Enter your username"
            />
          </div>
          <div className="formElements">
            <span className="label">Password:</span>
            <input
              type="password"
              name="password"
              value={password}
              required={true}
              onChange={handleChangeLoginForm}
              className="formElementInput"
              placeholder="Enter your password"
            />
          </div>
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
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
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
