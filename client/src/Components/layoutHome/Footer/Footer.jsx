import styles from './Footer.module.css';

const Footer = ()=> {
    return (
        <>
            <footer className={styles.footerContainer}>
                <h2 className={styles.footerDescription}>Copyright © 2023 Huy Nguyen</h2>
            </footer>
        </>
    );
}

export default Footer;