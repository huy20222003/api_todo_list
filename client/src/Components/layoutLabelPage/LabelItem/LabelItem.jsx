import { useState, useCallback, useEffect, useContext, memo } from 'react';
import { toast } from 'react-toastify';
import { LabelsContext } from '../../../Context/LabelsContext';
import Modal from '../../Form/Modal/Modal';
import styles from './LabelItem.module.css';

const LabelItem = () => {
  const {
    getAllLabels,
    setLabels,
    setShowEditLabel,
    deleteLabels,
    labelState: { labels },
  } = useContext(LabelsContext);

  useEffect(() => {
    getAllLabels();
  }, []);

  const [id, setId] = useState('');
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleDeleteLabel = (labelId) => {
    setShowModalDelete(true);
    setId(labelId);
  };

  const handleSubmitDelete = useCallback(async () => {
    try {
      const deleteData = await deleteLabels(id); // Make sure to import or define deleteLabels function
      if (!deleteData.status) {
        toast.error('Delete Failed!');
      } else {
        toast.success('Deleted Successfully!');
      }
    } catch (error) {
      toast.error('Server Error');
    }
    handleClose();
  }, [id]);

  const handleClose = () => {
    setShowModalDelete(false);
  };

  const handleEditTodoId = (labelId) => {
    setShowEditLabel(true);
    setLabels(labelId);
  };

  return (
    <>
      {labels.map((label) => (
        <div key={label._id} className={styles.container}>
          <div>
            <h3 className={styles.labelName}>{label.name}</h3>
          </div>
          <div className={styles.labelFooterContainer}>
            <div>
              <i
                className={`fa-solid fa-pen ${styles.labelPencil}`}
                onClick={() => handleEditTodoId(label._id)}
              ></i>
              <i
                className={`fa-solid fa-trash ${styles.labelTrash}`}
                onClick={() => handleDeleteLabel(label._id)}
              ></i>
            </div>
          </div>
        </div>
      ))}
      <Modal
        header={'Delete'}
        message={'Are you sure you want to delete?'}
        handleDelete={handleSubmitDelete}
        handleClose={handleClose}
        showModalDelete={showModalDelete}
      />
    </>
  );
};

export default memo(LabelItem);
