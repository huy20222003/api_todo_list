import { useContext, useState, memo, useCallback } from "react";
import { toast } from 'react-toastify';
import { TodosContext } from "../../../Context/TodosContext";
import { LabelsContext } from "../../../Context/LabelsContext";
import styles from './AddTodoForm.module.css';

const AddTodoForm = () => {
  const { showAddModal, setShowAddModal, createTodos } = useContext(TodosContext);
  const { labelState: { labels } } = useContext(LabelsContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [label, setLabel] = useState('');

  const handleChangeName = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const handleChangeDescription = useCallback((e) => {
    setDescription(e.target.value);
  }, []);

  const handleChangeLabel = useCallback((e) => {
    setLabel(e.target.value);
  }, []);

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    try {
      const addData = await createTodos({ name, description, label });
      if (!addData.status) {
        toast.error('Add todo failed');
      } else {
        toast.success('Add todo successfully!');
        setShowAddModal(false);
      }
    } catch (error) {
      toast.error('Server error');
    }
    setName('');
    setDescription('');
    setLabel('');
  };

  const handleCloseForm = useCallback(() => {
    setShowAddModal(false);
    setName('');
    setDescription('');
    setLabel('');
  }, [setShowAddModal]);

  const renderLabelOptions = () => {
    return (
      <>
        <option value="" disabled>Choose your label</option>
        {labels.map((label) => (
          <option key={label._id} value={label.name}>{label.name}</option>
        ))}
      </>
    );
  };

  return (
    <div className={`${styles.container} ${showAddModal ? "" : "d-none"}`}>
      <div className={styles.overlay}>
        <form className={styles.addTodoForm} onSubmit={handleCreateTodo}>
          <div className={styles.closeButtonContainer} onClick={handleCloseForm}>
            <i className={`fa-solid fa-xmark ${styles.closeButton}`}></i>
          </div>
          <div className={styles.header}>
            <h1 className={styles.title}>
              ADD TODO
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
                onChange={handleChangeName}
                className='formElementInput'
                placeholder="Enter your Todo name"
              />
            </div>
            <div className='formElements'>
              <label htmlFor="description" className='label'>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={handleChangeDescription}
                className='formElementInput descriptionHeight resize-none'
                placeholder="Enter your description"
              ></textarea>
            </div>
            <div className='formElements'>
              <label htmlFor="label" className='label'>
                Label
              </label>
              <div>
                <select id="label" name="label" className="formElementInput" value={label} onChange={handleChangeLabel}>
                  {renderLabelOptions()}
                </select>
              </div>
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

export default memo(AddTodoForm);
