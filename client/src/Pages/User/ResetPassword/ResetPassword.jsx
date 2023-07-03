import Header from '../../../Components/layoutHome/Header';
import Footer from '../../../Components/layoutHome/Footer';
import styles from './ResetPassword.module.css';

const ResetPassword = ()=> {
    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <Header />
            </div>
            <div className={styles.content}>
                <p>Feature is under development. Please come back later.</p>
            </div>
            <div className={styles.footerContainer}>
                <Footer />
            </div>
        </div>
    );
}

export default ResetPassword;