import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../../../Context/UserContext';
import styles from './VerifyCode.module.css';

const VerifyCode = () => {
  const [codes, setCodes] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const { showModalVerify, setShowModalVerify, verifyCode} = useContext(UserContext);

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

  return (
    <div className={`${styles.container} ${showModalVerify ? '' : 'd-none'}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Verification code</h2>
        <p className={styles.description}>Enter your verification code</p>
      </div>
      <div className={styles.codeInputs}>
        <input
            type="number"
            maxLength={6}
            className={styles.codeInput}
            value={codes}
            onChange={(event) => handleChange(event)}
          />
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={()=>setShowModalVerify(false)} className='cancelButton'>Cancel</button>
        <button onClick={handleVerify} className='primaryButton'>Verify</button>
        {isVerified && <p>Code is verified!</p>}
      </div>
    </div>
  );
};

export default VerifyCode;
