import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../../Components/layoutHome/Header';
import Footer from '../../../Components/layoutHome/Footer';
import styles from './ResetPassword.module.css';
import { UserContext } from '../../../Context/UserContext';

const ResetPassword = ()=> {
    const [emailReset, setEmailReset] = useState('');
    const { resetPasswords } = useContext(UserContext);
    const navigate = useNavigate();

    const handleChangeresetPasswordForm = (e)=> {
        setEmailReset(e.target.value);
    }

    const handleResetPassword = async (e)=> {
        e.preventDefault();
        try {
            const resetData = await resetPasswords({email: emailReset});
            if(!resetData.status) {
                toast.error('Email does not exist');
            } else {
                toast.success('Password reset email has been sent');
                navigate('/user/update-password');
            }
        } catch (error) {
            toast.error('Server error');
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <Header />
            </div>
            <div className={styles.content}>
                <div className={styles.titleContainer}>
                    <h3 className={styles.title}>Reset Password</h3>
                </div>
                <form onSubmit={handleResetPassword}>
                    <div className='formElements'>
                        <span className={`label ${styles.ml10}`}>Email:</span>
                        <input 
                            type="email" 
                            name='email'
                            className='formElementInput' 
                            value={emailReset}  
                            onChange={handleChangeresetPasswordForm}
                            placeholder='Your Email'/>
                    </div>
                    <div>
                        <button className={`primaryButton ${styles.w80}`}>Send</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;