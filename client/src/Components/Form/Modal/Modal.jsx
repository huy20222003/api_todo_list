import { memo } from 'react';
import styles from './Modal.module.css';
import Button from '../../Button';

const Modal = ({
  header,
  message,
  handleClose,
  handleDelete,
  showModalDelete,
}) => {
  return (
    <div className={`${styles.container} ${showModalDelete ? '' : 'd-none'}`}>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <h2 className={styles.title}>{header}</h2>
            <span className={styles.close} onClick={handleClose}>
              &times;
            </span>
          </div>
          <div className={styles.body}>
            <p className={styles.description}>{message}</p>
          </div>
          <div className={styles.footer}>
            <Button
              textName='Cancel'
              type='button'
              onClick={handleClose}
              size='small'
              color='error'
            />
            <Button
              textName='Delete'
              type='button'
              onClick={handleDelete}
              size='small'
              color='primary'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Modal);
