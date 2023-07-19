import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../../../Context/UserContext';
import styles from './VerifyCode.module.css';

const VerifyCode = () => {
  const [codes, setCodes] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const { showModalVerify, setShowModalVerify, verifyCode, setReadOnly, setUpdatedButton} = useContext(UserContext);

  const handleChange = (event) => {
    setCodes(event.target.value);
  };

  const handleVerify = async () => {
    try {
      const verifyData  = await verifyCode(parseFloat(codes));
      if(!verifyData.status) {
        toast.error(verifyData.message);
      } else {
        toast.success(verifyData.message);
        setShowModalVerify(false);
      }
    } catch (error) {
      toast.error('Server Error');
    } finally {
      setCodes('');
    }
  };

  const handleCancel = ()=> {
    setReadOnly(true);
    setShowModalVerify(false);
    setUpdatedButton(false);
  }

  return (
    <div className={`${styles.container} ${showModalVerify ? '' : 'd-none'}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Verification code</h2>
        <p className={styles.description}>Enter your verification code</p>
      </div>
      <div className={styles.codeInputs}>
        <input
            type="text" // Sử dụng type="text" để chuyển đổi thành input văn bản thường
            pattern="[0-9]*" // Sử dụng pattern="[0-9]*" để chỉ cho phép nhập các ký tự số
            inputMode="numeric" // Sử dụng inputMode="numeric" để chỉ cho trình duyệt hiển thị bàn phím số trên điện thoại
            maxLength={6}
            className={styles.codeInput}
            value={codes}
            onChange={(event) => handleChange(event)}
          />
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handleCancel} className='cancelButton'>Cancel</button>
        <button onClick={handleVerify} className='primaryButton'>Verify</button>
        {isVerified && <p>Code is verified!</p>}
      </div>
    </div>
  );
};

export default VerifyCode;
