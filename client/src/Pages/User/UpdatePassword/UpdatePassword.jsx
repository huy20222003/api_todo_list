import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../../Components/layoutHome/Header';
import Footer from '../../../Components/layoutHome/Footer';
import styles from './UpdatePassword.module.css';
import { UserContext } from '../../../Context/UserContext';

const UpdatePassword = ()=> {
    const { updatePasswordAfterReset } = useContext(UserContext);
    const navigate = useNavigate();
    const [updateForm, setUpdateForm] = useState({
        newPassword: '',
        confirmPassword: '',
        token: '',
    });

    const { newPassword, confirmPassword, token } = updateForm;

    const handleChangeUpdatePasswordForm = (e)=> {
        setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
    }

    const handleUpdatePasswordAfterReset =  async (e)=> {
        e.preventDefault();
        if(newPassword != confirmPassword) {
            toast.info('Password incorrect!');
        }
        try {
            const updateData = await updatePasswordAfterReset(updateForm);
            if(!updateData.status) {
                toast.error(updateData.message);
            } else {
                toast.success(updateData.message);
                navigate('/');
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
                <form onSubmit={handleUpdatePasswordAfterReset}>
                    <div className='formElements'>
                        <span className={`label ${styles.ml10}`}>New Password:</span>
                        <input 
                            type="password" 
                            name='newPassword'
                            className='formElementInput' 
                            value={newPassword}  
                            onChange={handleChangeUpdatePasswordForm}
                            placeholder='Your new Password'/>
                    </div>
                    <div className='formElements'>
                        <span className={`label ${styles.ml10}`}>Confirm new Password:</span>
                        <input 
                            type="password" 
                            name='confirmPassword'
                            className='formElementInput' 
                            value={confirmPassword}  
                            onChange={handleChangeUpdatePasswordForm}
                            placeholder='Your Confirm Password'/>
                    </div>
                    <div className='formElements'>
                        <span className={`label ${styles.ml10}`}>Email:</span>
                        <input 
                            type="text" 
                            name='token'
                            className='formElementInput' 
                            value={token}  
                            onChange={handleChangeUpdatePasswordForm}
                            placeholder='Your Verification code'/>
                    </div>
                    <div>
                        <button className={`primaryButton ${styles.w80}`}>Update</button>
                    </div>
                </form>
            </div>
            <div className={styles.footerContainer}>
                <Footer />
            </div>
        </div>
    );
}

export default UpdatePassword;