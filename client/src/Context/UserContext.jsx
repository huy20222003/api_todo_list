import { useState, createContext } from 'react';
import axios from 'axios';
import { Api_URL } from '../constant';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
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

      const resetPasswords = async(resetPassowrdForm)=> {
        try {
            const response = await axios.post(`${Api_URL}/user/password/forgot-password`, resetPassowrdForm);
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


    const userData = {
        updatePasswords,
        resetPasswords,
        updatePasswordAfterReset
    }
    return <UserContext.Provider value={userData}>{children}</UserContext.Provider>
}

