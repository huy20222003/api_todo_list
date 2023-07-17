import { useContext, memo } from 'react';
import { toast } from 'react-toastify';
import styles from './DeleteLabel.module.css';
import { LabelsContext } from '../../../Context/LabelsContext';

const Modal = ()=> {
    const { showModalDelete, setShowModalDelete, deleteLabels, id } = useContext(LabelsContext);

    const handleDeleteConfirm = async ()=> {
        try {
            const deleteData = await deleteLabels(id);
            if(!deleteData.status) {
              toast.error('Delete Failed!');
            } else {
              toast.success('Deleted Successful!');
            }
        } catch (error) {
            toast.error('Server Error');
        }
        setShowModalDelete(false);
    }

    const handleCloseModalConfirm = ()=> {
        setShowModalDelete(false);
    }

    return (
        <div className={`${styles.container} ${showModalDelete ? '' : 'd-none'}`}>
            <div className={styles.overlay}>
                <div className={styles.modal}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Delete</h2>
                        <i className={`fa-regular fa-circle-xmark ${styles.close}`} onClick={handleCloseModalConfirm}></i>
                    </div>
                    <div className={styles.body}>
                        <p className={styles.description}>Are you sure you want to delete it?</p>
                    </div>
                    <div className={styles.footer}>
                        <button className='cancelButton' onClick={handleCloseModalConfirm}>Cancel</button>
                        <button className='primaryButton' onClick={handleDeleteConfirm}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Modal);