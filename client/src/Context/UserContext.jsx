import { useState, createContext, useContext } from 'react';
import axios from 'axios';
import { Api_URL } from '../constant';
import Cookies from 'js-cookie';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [showModalVerify, setShowModalVerify] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [updatedButton, setUpdatedButton] = useState(true);
  const [camera, setCamera] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleError = (error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  };

  // Send verification code
  const sendCode = async (form) => {
    try {
      Cookies.set('data', form.email);
      const response = await axios.post(`${Api_URL}/user/send-code`, form);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  // Update password after reset
  const updatePassword = async (updateForm) => {
    updateForm.email = Cookies.get('data');
    try {
      const response = await axios.patch(
        `${Api_URL}/user/password/reset-password`,
        updateForm
      );
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  // Verify code
  const verifyCode = async (code) => {
    try {
      const emailCookie = Cookies.get('data');
      const verifyData = {
        code,
        email: emailCookie,
      };
      const response = await axios.post(
        `${Api_URL}/user/verify-code`,
        verifyData
      );
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  // Update user info
  const updateUserInfo = async (userInfo) => {
    try {
      const response = await axios.put(
        `${Api_URL}/user/profile/update`,
        userInfo
      );
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  // Upload avatar
  const uploadFile = async (base64) => {
    try {
      const response = await axios.post(
        `${Api_URL}/user/upload-file`,
        base64
      );
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  };

  const encodeDesc = async (desc) => {
    try {
      const response = await axios.post(`${Api_URL}/user/encode-desc`, desc);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }

  const userData = {
    showModalVerify,
    setShowModalVerify,
    readOnly,
    setReadOnly,
    updatedButton,
    setUpdatedButton,
    sendCode,
    verifyCode,
    updatePassword,
    updateUserInfo,
    uploadFile,
    camera,
    setCamera,
    encodeDesc,
    isVerified,
    setIsVerified
  };

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};
