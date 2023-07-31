import { memo } from 'react';
import styles from './Modal.module.css';

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
            <button className="cancelButton" onClick={handleClose}>
              Cancel
            </button>
            <button className="primaryButton" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Modal);
