import { useContext, useState, memo, useEffect } from 'react';
import { toast } from 'react-toastify';
import { TodosContext } from '../../../Context/TodosContext';
import { LabelsContext } from '../../../Context/LabelsContext';
import styles from './EditTodoForm.module.css';

const EditTodoForm = () => {
  const {
    showEditModal,
    setShowEditModal,
    editTodos,
    todoState: { todo },
  } = useContext(TodosContext);
  const {
    labelState: { labels },
  } = useContext(LabelsContext);
  const [editForm, setEditForm] = useState({
    _id: todo?._id || '',
    name: todo?.name || '',
    description: todo?.description || '',
    label: todo?.label || 'pending',
  });

  useEffect(() => {
    setEditForm({
      _id: todo?._id || '',
      name: todo?.name || '',
      description: todo?.description || '',
      label: todo?.label || 'pending',
    });
  }, [todo]);

  const { name, description, label } = editForm;

  const handleChangeEditForm = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setShowEditModal(false);
  };

  const handleEditTodo = async (e) => {
    e.preventDefault();
    try {
      const editData = await editTodos(editForm);
      if (!editData.status) {
        toast.error('Edit todo failed');
      } else {
        toast.success('Edit todo successfully!');
      }
    } catch (error) {
      toast.error('Server error');
    }
    setShowEditModal(false);
  };

  return (
    <div className={`${styles.container} ${showEditModal ? '' : 'd-none'}`}>
      <div className={styles.overlay}>
        <form className={styles.editTodoForm} onSubmit={handleEditTodo}>
          <div
            className={styles.closeButtonContainer}
            onClick={() => setShowEditModal(false)}
          >
            <i className={`fa-solid fa-xmark ${styles.closeButton}`}></i>
          </div>
          <div className={styles.header}>
            <h1 className={styles.title}>EDIT TODO</h1>
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
                onChange={handleChangeEditForm}
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
                onChange={handleChangeEditForm}
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
                  onChange={handleChangeEditForm}
                >
                  <optgroup label="Choose your label">
                    {labels.map((label) => (
                      <option key={label._id} value={label.name}>
                        {label.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className="cancelButton"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="primaryButton">
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(EditTodoForm);
