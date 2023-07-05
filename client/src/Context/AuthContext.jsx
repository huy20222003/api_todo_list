import { createContext, useEffect, useReducer } from 'react';
import { initStateAuth, reducer } from '../Reducer/AuthReducer/reducer';
import { Api_URL, LOCAL_STORAGE_TOKEN_NAME } from '../constant';
import { setAuth } from '../Reducer/AuthReducer/action';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(reducer, initStateAuth);

  // Load user
  const loadUser = async () => {
    try {
      const localStorageToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);

      if (localStorageToken) {
        setAuthToken(localStorageToken);
      } else {
        dispatch(
          setAuth({
            isAuthenticated: false,
            user: null,
          })
        );
        return;
      }

      const response = await axios.get(`${Api_URL}/auth`);

      if (response.data.status) {
        dispatch(
          setAuth({
            isAuthenticated: true,
            user: response.data.user,
          })
        );
      } else {
        dispatch(
          setAuth({
            isAuthenticated: false,
            user: null,
          })
        );
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        setAuthToken(null);
      }
    } catch (error) {
      dispatch(
        setAuth({
          isAuthenticated: false,
          user: null,
        })
      );
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Register User
  const registerUser = async (registerForm) => {
    try {
      const response = await axios.post(`${Api_URL}/auth/register`, registerForm);
      await loadUser();

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return {
          status: false,
          message: error.message,
        };
      }
    }
  };

  // Login User
  const loginUser = async (loginForm) => {
    try {
      const response = await axios.post(`${Api_URL}/auth/login`, loginForm);
      await loadUser();

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return { status: false, message: error.message };
      }
    }
  };

  // Logout
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch(
      setAuth({
        isAuthenticated: false,
        user: null,
      })
    );
  };

  const AuthContextData = {
    authState,
    loadUser,
    registerUser,
    loginUser,
    logoutUser,
  };

  return <AuthContext.Provider value={AuthContextData}>{children}</AuthContext.Provider>;
};
