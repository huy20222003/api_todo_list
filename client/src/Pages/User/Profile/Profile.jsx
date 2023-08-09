import {
  useContext,
  useEffect,
  useRef,
  memo,
  useState,
  useCallback,
} from 'react';
import HeaderContent from '../../../Components/layoutContent/HeaderContent';
import { AuthContext } from '../../../Context/AuthContext';
import { UserContext } from '../../../Context/UserContext';
import styles from './Profile.module.css';
import { toast } from 'react-toastify';
import FormInput from '../../../Components/Form/FormInput';
import Button from '../../../Components/Button';

const Profile = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  const {
    updateUserInfo,
    sendCode,
    setShowModalVerify,
    readOnly,
    setReadOnly,
    updatedButton,
    setUpdatedButton,
    camera,
    setCamera,
    uploadFile,
  } = useContext(UserContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImg, setPreviewImg] = useState(user?.avatar || null);
  const refInputFile = useRef();

  const [userInfo, setUserInfo] = useState({
    fullName: user?.fullName || '',
    username: user?.username || '',
    email: user?.email || '',
    avatar: user?.avatar || selectedImage,
  });

  useEffect(() => {
    setUserInfo({
      fullName: user?.fullName || '',
      username: user?.username || '',
      email: user?.email || '',
      avatar: user?.avatar || selectedImage,
    });
  }, [user]);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  }, []);

  const handleChooseFile = () => {
    refInputFile.current.click();
  };

  const handleChangeFile = useCallback(async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImg(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.onerror = () => {
        toast.error('Error occurred while reading the file.');
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  }, []);

  const handleSave = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        // If a new image was selected, update the user's avatar
        if (selectedImage) {
          userInfo.avatar = selectedImage;
        }

        const updateData = await updateUserInfo(userInfo);
        if (!updateData.success) {
          toast.error(updateData.message);
        } else {
          toast.success(updateData.message);
          setUpdatedButton(true);
          setReadOnly(true);
          setCamera(false);
        }
      } catch (error) {
        toast.error('Server error');
      }
    },
    [updateUserInfo, userInfo, selectedImage]
  );

  const handleSendCode = useCallback(
    async (e) => {
      e.preventDefault();
      setShowModalVerify(true);
      try {
        const sendData = await sendCode({ email: user?.email });
        if (!sendData.success) {
          toast.error(sendData.message);
        } else {
          toast.success(sendData.message);
        }
      } catch (error) {
        toast.error('Server error');
      }
    },
    [sendCode, user]
  );

  const handleCancel = useCallback((event) => {
    event.preventDefault();
    setUpdatedButton(true);
    setReadOnly(true);
    setCamera(false);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HeaderContent />
      </div>
      <div className={styles.content}>
        <div className={styles.userInfoContainer}>
          <div className={styles.avatarContainer}>
            <img
              src={previewImg ? previewImg : user?.avatar}
              className={styles.userInfoImage}
              alt={user?.fullName}
            />
            <input
              type="file"
              ref={refInputFile}
              name="avatar"
              onChange={handleChangeFile}
              accept="image/*"
              hidden={true}
            />
            <i
              className={camera ? 'fa-solid fa-camera' : 'd-none'}
              onClick={handleChooseFile}
            ></i>
          </div>
          <h2 className={styles.userInfoName}>{user?.fullName}</h2>
        </div>
        <div className={styles.infoDetailContainer}>
          <h1 className={styles.infoDetailTitle}>Information</h1>
          <form className={styles.infoDetailForm} onSubmit={handleSave}>
            <FormInput
              textName="fullName"
              icon="fa-solid fa-user"
              type="text"
              value={userInfo?.fullName}
              onChange={handleChange}
              readOnly={readOnly}
            />
            <FormInput
              textName="username"
              icon="fa-solid fa-user"
              type="text"
              value={userInfo?.username}
              onChange={handleChange}
              readOnly={readOnly}
            />
            <FormInput
              textName="email"
              icon="fa-solid fa-envelope"
              type="email"
              value={userInfo?.email}
              onChange={handleChange}
              readOnly={readOnly}
            />
            <div className={styles.updateButtonContainer}>
              {updatedButton ? (
                <Button
                  textName="Update"
                  type="button"
                  onClick={handleSendCode}
                  size="small"
                  color="primary"
                />
              ) : (
                <>
                  <Button
                    textName="Cancel"
                    type="button"
                    onClick={handleCancel}
                    size="small"
                    color="error"
                  />
                  <Button
                    textName="Save"
                    type="submit"
                    size="small"
                    color="primary"
                  />
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(Profile);
