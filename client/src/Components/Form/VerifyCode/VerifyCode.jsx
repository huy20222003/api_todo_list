import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../../../Context/UserContext';
import styles from './VerifyCode.module.css';
import FormInput from '../../../Components/Form/FormInput';
import Button from '../../Button';

const VerifyCode = () => {
  const [codes, setCodes] = useState('');
  const {
    showModalVerify,
    setShowModalVerify,
    verifyCode,
    setReadOnly,
    setUpdatedButton,
    setCamera,
    setIsVerified
  } = useContext(UserContext);

  const handleChange = (event) => {
    setCodes(event.target.value);
  };

  const handleVerify = async () => {
    try {
      const verifyData = await verifyCode(parseFloat(codes));
      if (!verifyData.success) {
        toast.error(verifyData.message);
      } else {
        toast.success(verifyData.message);
        setShowModalVerify(false);
        setReadOnly(false);
        setUpdatedButton(false);
        setCamera(true);
        setIsVerified(true);
      }
    } catch (error) {
      toast.error('Server Error');
    } finally {
      setCodes('');
    }
  };

  return (
    <div className={`${styles.container} ${showModalVerify ? '' : 'd-none'}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Verification code</h2>
        <p className={styles.description}>Enter your verification code</p>
      </div>
      <div className={styles.codeInputs}>
        <FormInput
          textName='code'
          icon='fa-solid fa-code'
          type='text'
          pattern = '[0-9]*'
          inputMode='numeric'
          maxLength={6}
          value={codes}
          placeholder='Enter your verification code'
          onChange={handleChange}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button
          textName='Verify'
          type='button'
          onClick={handleVerify}
          size='large'
          color='primary'
        />
      </div>
    </div>
  );
};

export default VerifyCode;
