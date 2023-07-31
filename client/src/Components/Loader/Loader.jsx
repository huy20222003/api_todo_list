import { memo } from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  return <div className={styles.customLoader}></div>;
};

export default memo(Loader);
