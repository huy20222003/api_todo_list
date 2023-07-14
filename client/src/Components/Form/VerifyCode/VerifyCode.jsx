import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../../../Context/UserContext';
import styles from './VerifyCode.module.css';

const VerifyCode = () => {
  const [codes, setCodes] = useState(['', '', '', '', '', '']);
  const [isVerified, setIsVerified] = useState(false);
  const { showModalVerify, setShowModalVerify, verifyCode} = useContext(UserContext);

  const handleChange = (event, index) => {
    const newCodes = [...codes];
    newCodes[index] = event.target.value;
    setCodes(newCodes);
  };

  const handleVerify = async () => {
    try {
      const verifyData  = await verifyCode(parseFloat(codes.join('')));
      if(!verifyData.status) {
        toast.error(verifyData.message);
      } else {
        toast.success(verifyData.message);
        setShowModalVerify(false);
      }
    } catch (error) {
      toast.error('Server Error');
    } finally {
      setCodes(['', '', '', '', '', '']);
    }
  };

  return (
    <div className={`${styles.container} ${showModalVerify ? '' : 'd-none'}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Verification code</h2>
        <p className={styles.description}>Enter your verification code</p>
      </div>
      <div className={styles.codeInputs}>
        {codes.map((code, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            className={styles.codeInput}
            value={code}
            onChange={(event) => handleChange(event, index)}
          />
        ))}
      </div>
      <button onClick={handleVerify} className={styles.verifyButton}>Verify</button>
      {isVerified && <p>Code is verified!</p>}
    </div>
  );
};

export default VerifyCode;
