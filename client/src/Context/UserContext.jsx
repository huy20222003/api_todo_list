import { useState, createContext, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { Api_URL } from '../constant';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [showModalVerify, setShowModalVerify] = useState(false);
    const { authState: { user }} = useContext(AuthContext);
    //update password
    const updatePasswords = async (updatePasswordForm)=> {
        try {
          const response = await axios.put(`${Api_URL}/user/password/update`, updatePasswordForm);
          return response.data;
        } catch (error) {
          if (error.response && error.response.data) {
            return error.response.data;
          } else {
            return { status: false, message: error.message };
          }
        }
      }

      const sendCode = async(form)=> {
        try {
            sessionStorage.setItem('email', user?.email);
            const response = await axios.post(`${Api_URL}/user/send-code`, form);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return error.response.data;
            } else {
                return { status: false, message: error.message };
            }
        }
      }

      const updatePasswordAfterReset = async (updateForm)=> {
        try {
          const response = await axios.post(`${Api_URL}/user/password/reset-password`, updateForm);
          return response.data;
        } catch (error) {
          if (error.response && error.response.data) {
              return error.response.data;
          } else {
              return { status: false, message: error.message };
          }
        }
      }

      const verifyCode = async(code)=> {
        try {
          const emailSessionStorage = sessionStorage.getItem('email');
          const verifyData = {
            code, 
            email: emailSessionStorage
          }
          const response = await axios.post(`${Api_URL}/user/verify-code`, verifyData);
          return response.data;
        } catch (error) {
          if (error.response && error.response.data) {
            return error.response.data;
          } else {
              return { status: false, message: error.message };
          }
        }
      }

      const updateUserInfo = async (userInfo)=> {
        try {
          const response = await axios.put(`${Api_URL}/user/profile/update`, userInfo);
          return response.data;
        } catch (error) {
          if (error.response && error.response.data) {
            return error.response.data;
          } else {
              return { status: false, message: error.message };
          }
        }
      }


    const userData = {
      showModalVerify,
      setShowModalVerify,
      updatePasswords,
      sendCode,
      verifyCode,
      updatePasswordAfterReset,
      updateUserInfo
    }
    return <UserContext.Provider value={userData}>{children}</UserContext.Provider>
}

