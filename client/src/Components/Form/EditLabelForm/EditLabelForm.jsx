import { useContext, useState, memo, useEffect } from "react";
import { toast } from 'react-toastify';
import { LabelsContext } from "../../../Context/LabelsContext";
import styles from './EditLabelForm.module.css'

const EditLabelForm = () => {
  const { showEditLabel, setShowEditLabel, editLabels, labelState: {label} } = useContext(LabelsContext);
  const initialEditFormState = {
    _id: (label && label._id) || '',
    name: (label && label.name) || '',
  };
  
  const [editForm, setEditForm] = useState(initialEditFormState);

  useEffect(() => {
    // Kiểm tra và đảm bảo todo không phải là null trước khi setEditForm
    if (label) {
      setEditForm({
        _id: (label._id !== null) ? label._id : '',
        name: (label.name !== null) ? label.name : '',
      });
    }
  }, [label]);
  
  const { name } = editForm;

  const handleChangeEditForm = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
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
    // setEditForm({ name: '', description: '', label: '' });
  };

  return (
    <div className={`${styles.container} ${showEditLabel ? "" : "d-none"}`}>
      <div className={styles.overlay}>
        <form className={styles.editLabelForm} onSubmit={handleEditLabel}>
          <div className={styles.closeButtonContainer} onClick={() => setShowEditLabel(false)}>
            <i className={`fa-solid fa-xmark ${styles.closeButton}`}></i>
          </div>
          {/* <div className={styles.header}>
            <h1 className={styles.title}>
              EDIT LABEL
            </h1>
          </div> */}
          <div>
            <div className='formElements'>
              <label htmlFor="name" className="label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleChangeEditForm}
                className='formElementInput'
                placeholder="Enter your label name"
              />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className="cancelButton"
              onClick={() => setShowEditLabel(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="primaryButton"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default memo(EditLabelForm);
