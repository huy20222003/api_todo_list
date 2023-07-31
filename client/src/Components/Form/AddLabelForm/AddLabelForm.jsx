import { useContext, useState, memo, useCallback } from 'react';
import { toast } from 'react-toastify';
import { LabelsContext } from '../../../Context/LabelsContext';
import styles from './AddLabelForm.module.css';

const AddLabelForm = () => {
  const { showAddLabel, setShowAddLabel, createLabels } =
    useContext(LabelsContext);
  const [addLabelForm, setAddLabelForm] = useState({
    name: ''
  });

  const handleChangeAddLabel = useCallback((e) => {
    setAddLabelForm({...addLabelForm, [e.target.name]: e.target.value});
  });

  const {name} = addLabelForm;

  const handleCreateLabel = useCallback(
    async (e) => {
      e.preventDefault();
      const addData = await createLabels({ name });
      if (!addData.status) {
        toast.error('Add label failed');
      } else {
        toast.success('Add label successfully!');
        setShowAddLabel(false);
      }
      setAddLabelForm({name: ''});
    },
    [createLabels, name, setShowAddLabel]
  );

  const handleCloseForm = useCallback(() => {
    setShowAddLabel(false);
    setAddLabelForm({name: ''});
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
            <div className="formElements">
              <label htmlFor="name" className="label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={name}
                onChange={handleChangeAddLabel}
                className="formElementInput"
                placeholder="Enter your label name"
              />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className="cancelButton"
              onClick={handleCloseForm}
            >
              Cancel
            </button>
            <button type="submit" className="primaryButton">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(AddLabelForm);
