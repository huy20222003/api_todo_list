import { useContext, useState, memo, useCallback } from 'react';
import { toast } from 'react-toastify';
import FormInput from '../FormInput';
import { LabelsContext } from '../../../Context/LabelsContext';
import styles from './AddLabelForm.module.css';
import Button from '../../Button';

const AddLabelForm = () => {
  const { showAddLabel, setShowAddLabel, createLabels } =
    useContext(LabelsContext);
  const [addLabelForm, setAddLabelForm] = useState({
    name: '',
  });

  const handleChangeAddLabel = useCallback((e) => {
    setAddLabelForm({ ...addLabelForm, [e.target.name]: e.target.value });
  });

  const { name } = addLabelForm;

  const handleCreateLabel = useCallback(
    async (e) => {
      e.preventDefault();
      const addData = await createLabels({ name });
      if (!addData.success) {
        toast.error('Add label failed');
      } else {
        toast.success('Add label successfully!');
        setShowAddLabel(false);
      }
      setAddLabelForm({ name: '' });
    },
    [createLabels, name, setShowAddLabel]
  );

  const handleCloseForm = useCallback(() => {
    setShowAddLabel(false);
    setAddLabelForm({ name: '' });
  }, [setShowAddLabel]);

  return (
    <div className={`${styles.container} ${showAddLabel ? '' : 'd-none'}`}>
      <div className={styles.overlay}>
        <form className={styles.addLabelForm} onSubmit={handleCreateLabel}>
          <div
            className={styles.closeButtonContainer}
            onClick={handleCloseForm}
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
              onChange={handleChangeAddLabel}
              placeholder='Enter your label name'
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button
              textName='Cancel'
              type='button'
              onClick={handleCloseForm}
              size='small'
              color='error'
            />
            <Button
              textName='Add'
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

export default memo(AddLabelForm);
