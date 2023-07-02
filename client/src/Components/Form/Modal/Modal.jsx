import { useContext } from 'react';
import { toast } from 'react-toastify';
import styles from './Modal.module.css';
import { TodosContext } from '../../../Context/TodosContext';

const Modal = ()=> {
    const { showModalDelete, setShowModalDelete, deleteTodos, id } = useContext(TodosContext);

    const handleDeleteConfirm = async ()=> {
        try {
            const deleteData = await deleteTodos(id);
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
                        <i className={`fa-solid fa-xmark ${styles.close}`} onClick={handleCloseModalConfirm}></i>
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

export default Modal;