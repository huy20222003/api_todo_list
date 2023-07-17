import { useContext, useState, memo } from "react";
import { toast } from 'react-toastify';
import { LabelsContext } from "../../../Context/LabelsContext";
import styles from './AddLabelForm.module.css';

const AddLabelForm = () => {
  const { showAddLabel, setShowAddLabel, createLabels } = useContext(LabelsContext);
  const [name, setName] = useState('');

  const handleChangeAddLabel = (e) => {
    setName(e.target.value);
  };

  const handleCreateLabel = async (e) => {
    e.preventDefault();
    try {
      const addData = await createLabels({name});
      if (!addData.status) {
        toast.error('Add label failed');
      } else {
        toast.success('Add label successfully!');
      }
    } catch (error) {
      toast.error('Server Error');
    }
    setShowAddLabel(false);
    setName('');
  };

  return (
    <div className={`${styles.container} ${showAddLabel ? "" : "d-none"}`}>
      <div className={styles.overlay}>
        <form className={styles.addLabelForm} onSubmit={handleCreateLabel}>
          <div className={styles.closeButtonContainer} onClick={() => setShowAddLabel(false)}>
            <i className={`fa-solid fa-xmark ${styles.closeButton}`}></i>
          </div>
          <div className={styles.header}>
            <h1 className={styles.title}>
              ADD LABEL
            </h1>
          </div>
          <div>
            <div className='formElements'>
              <label htmlFor="name" className='label'>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleChangeAddLabel}
                className='formElementInput'
                placeholder="Enter your label name"
              />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className="cancelButton"
              onClick={() => setShowAddLabel(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className='primaryButton'
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default memo(AddLabelForm);
