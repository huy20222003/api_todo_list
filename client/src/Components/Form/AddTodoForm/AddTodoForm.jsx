import { useContext, useState, memo, useCallback } from 'react';
import { toast } from 'react-toastify';
import { TodosContext } from '../../../Context/TodosContext';
import { LabelsContext } from '../../../Context/LabelsContext';
import styles from './AddTodoForm.module.css';

const AddTodoForm = () => {
  const { showAddModal, setShowAddModal, createTodos } =
    useContext(TodosContext);
  const {
    labelState: { labels },
  } = useContext(LabelsContext);
  const [addTodoForm, setAddTodoForm] = useState({
    name: '',
    description: '',
    label: '',
  });

  const handleChange = useCallback((e) => {
    setAddTodoForm({ ...addTodoForm, [e.target.name]: e.target.value });
  });

  const { name, description, label } = addTodoForm;

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    try {
      const addData = await createTodos(addTodoForm);
      if (!addData.status) {
        toast.error('Add todo failed');
      } else {
        toast.success('Add todo successfully!');
        setShowAddModal(false);
      }
    } catch (error) {
      toast.error('Server error');
    }
    setAddTodoForm({ name: '', description: '', label: '' });
  };

  const handleCloseForm = useCallback(() => {
    setShowAddModal(false);
    setAddTodoForm({ name: '', description: '', label: '' });
  }, [setShowAddModal]);

  const renderLabelOptions = () => {
    return (
      <>
        <option value="" disabled>
          Choose your label
        </option>
        {labels.map((label) => (
          <option key={label._id} value={label.name}>
            {label.name}
          </option>
        ))}
      </>
    );
  };

  return (
    <div className={`${styles.container} ${showAddModal ? '' : 'd-none'}`}>
      <div className={styles.overlay}>
        <form className={styles.addTodoForm} onSubmit={handleCreateTodo}>
          <div
            className={styles.closeButtonContainer}
            onClick={handleCloseForm}
          >
            <i className={`fa-solid fa-xmark ${styles.closeButton}`}></i>
          </div>
          <div className={styles.header}>
            <h1 className={styles.title}>ADD TODO</h1>
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
                value={name}
                onChange={handleChange}
                className="formElementInput"
                placeholder="Enter your Todo name"
              />
            </div>
            <div className="formElements">
              <label htmlFor="description" className="label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={handleChange}
                className="formElementInput descriptionHeight resize-none"
                placeholder="Enter your description"
              ></textarea>
            </div>
            <div className="formElements">
              <label htmlFor="label" className="label">
                Label
              </label>
              <div>
                <select
                  id="label"
                  name="label"
                  className="formElementInput"
                  value={label}
                  onChange={handleChange}
                >
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
            <button type="submit" className="primaryButton">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(AddTodoForm);
