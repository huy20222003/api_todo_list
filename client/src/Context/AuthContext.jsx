import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { initStateAuth, reducer } from '../Reducer/AuthReducer/reducer';
import { Api_URL } from '../constant';
import { setAuth } from '../Reducer/AuthReducer/action';
import setAuthToken from '../utils/setAuthToken';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(reducer, initStateAuth);

  const handleError = (error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { status: false, message: error.message };
    }
  };

  const setAuthenticatedUser = (isAuthenticated, user) => {
    dispatch(setAuth({ isAuthenticated, user }));
  };

  const loadUser = async () => {
    try {
      const accessToken = Cookies.get('user');
      if (!accessToken) {
        setAuthenticatedUser(false, null);
        return;
      } else {
        setAuthToken(accessToken);
        const response = await axios.get(`${Api_URL}/auth`);

        if (response.data.status) {
          setAuthenticatedUser(true, response.data.user);
        } else {
          setAuthenticatedUser(false, null);
          Cookies.remove('user');
          setAuthToken(null);
        }
      }
    } catch (error) {
      setAuthenticatedUser(false, null);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const registerUser = async (registerForm) => {
    try {
      const response = await axios.post(
        `${Api_URL}/auth/register`,
        registerForm
      );
      await loadUser();
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  const loginUser = async (loginForm) => {
    try {
      const response = await axios.post(`${Api_URL}/auth/login`, loginForm);
      await loadUser();
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  const logoutUser = () => {
    Cookies.remove('user');
    setAuthenticatedUser(false, null);
  };

  const handleRefreshToken = async () => {
    try {
      const refreshToken = Cookies.get('refresh');
      if (!refreshToken) {
        return;
      } else {
        const response = await axios.post(`${Api_URL}/auth/refresh`, {
          refreshToken,
        });

        if (response.data.status) {
          const expiration = new Date();
          expiration.setTime(expiration.getTime() + 180 * 60 * 1000);
          Cookies.set('user', response.data.accessToken, {
            expires: expiration,
          });
          await loadUser();
        }
      }
    } catch (error) {
      return handleError(error);
    }
  };

  //Tự động handle refreshToken mỗi khi loadUser
  // useEffect(() => {
  //   handleRefreshToken();
  // }, []);

  const AuthContextData = {
    authState,
    loadUser,
    registerUser,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={AuthContextData}>
      {children}
    </AuthContext.Provider>
  );
};
