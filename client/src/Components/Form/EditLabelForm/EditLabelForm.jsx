import { useContext, useState, memo, useEffect } from 'react';
import { toast } from 'react-toastify';
import { LabelsContext } from '../../../Context/LabelsContext';
import styles from './EditLabelForm.module.css';
import FormInput from '../FormInput';
import Button from '../../Button';

const EditLabelForm = () => {
  const {
    showEditLabel,
    setShowEditLabel,
    editLabels,
    labelState: { label },
  } = useContext(LabelsContext);
  const [editForm, setEditForm] = useState({
    _id: label?._id || '',
    name: label?.name || '',
  });

  useEffect(() => {
    if (label) {
      setEditForm({
        _id: label._id,
        name: label.name,
      });
    }
  }, [label]);

  const { name } = editForm;

  const handleChangeEditForm = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setShowEditLabel(false);
  };

  const handleEditLabel = async (e) => {
    e.preventDefault();
    try {
      const editData = await editLabels(editForm);
      if (!editData.status) {
        toast.error('Edit label failed');
      } else {
        toast.success('Edit label successfully!');
      }
    } catch (error) {
      toast.error('Server error');
    }
    setShowEditLabel(false);
  };

  return (
    <div className={`${styles.container} ${showEditLabel ? '' : 'd-none'}`}>
      <div className={styles.overlay}>
        <form className={styles.editLabelForm} onSubmit={handleEditLabel}>
          <div
            className={styles.closeButtonContainer}
            onClick={() => setShowEditLabel(false)}
          >
            <i className={`fa-solid fa-xmark ${styles.closeButton}`}></i>
          </div>
          <div>
            <FormInput
              textName='name'
              type='text'
              icon='fa-solid fa-tag'
              value={name}
              required={true}
              onChange={handleChangeEditForm}
              placeholder='Enter your label name'
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button
              textName='Cancel'
              type='button'
              onClick={handleCancel}
              size='small'
              color='error'
            />
            <Button
              textName='Edit'
              type='submit'
              size='small'
              color='primary'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(EditLabelForm);
