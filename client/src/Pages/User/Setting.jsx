import { useState, useContext } from 'react';
import {toast} from 'react-toastify';
import HeaderContent from '../../Components/layoutContent/HeaderContent';
import { AuthContext } from '../../Context/AuthContext';

const Setting = () => {
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const { oldPassword, newPassword, confirmPassword } = passwordForm;
  const {updatePasswords} = useContext(AuthContext);

  const handleChangePasswordForm = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleSubmitPasswordForm = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.warn('Password is incorrect');
      return;
    }

    try {
        const updatePasswordData = await updatePasswords(passwordForm);
        if(!updatePasswordData.status) {
            toast.error('Password update failed');
        } else {
            toast.success('Password update successful');
        }
    } catch (error) {
        toast.error('Server error');
    }

    // Reset form sau khi đổi mật khẩu thành công
    setPasswordForm({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
  };

  const handleGoBack = ()=> {
    history.back();
  }

  return (
    <div>
      <HeaderContent />
      <div className="container flex flex-col items-center w-10/12">
        <div className="mt-8 relative mb-2 w-full cursor-pointer" onClick={handleGoBack}>
            <i className="fa-solid fa-arrow-left absolute top-0 left-0 ml-2 text-gray-600 text-2xl"></i>
            <span className='ml-10 text-xl'>Back</span>
        </div>
        <h1 className="text-2xl font-bold mb-4 mt-14">Change Password</h1>
        <form className='w-full flex flex-col' onSubmit={handleSubmitPasswordForm}>
          <div className="mb-4">
            <p className="font-medium mb-1">Old Password:</p>
            <input
              type="password"
              name="oldPassword"
              value={oldPassword}
              onChange={handleChangePasswordForm}
              className="border-2 border-gray-300 px-2 py-2 rounded w-full outline-none"
              placeholder="Enter your old password"
            />
          </div>
          <div className="mb-4">
            <p className="font-medium mb-1">New Password:</p>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handleChangePasswordForm}
              className="border-2 border-gray-300 px-2 py-2 rounded w-full outline-none"
              placeholder="Enter your new password"
            />
          </div>
          <div className="mb-4">
            <p className="font-medium mb-1">Confirm Password:</p>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChangePasswordForm}
              className="border-2 border-gray-300 px-2 py-2 rounded w-full outline-none"
              placeholder="Confirm your new password"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Setting;
