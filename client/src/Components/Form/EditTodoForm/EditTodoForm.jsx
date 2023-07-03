import { useContext, useState, memo, useEffect } from "react";
import { toast } from 'react-toastify';
import { TodosContext } from "../../../Context/TodosContext";
import styles from './EditTodoForm.module.css'

const EditTodoForm = () => {
  const { showEditModal, setShowEditModal, editTodos, todoState: {todo} } = useContext(TodosContext);
  const initialEditFormState = {
    _id: (todo && todo._id) || '',
    name: (todo && todo.name) || '',
    description: (todo && todo.description) || '',
    label: (todo && todo.label) || 'pending',
  };
  
  const [editForm, setEditForm] = useState(initialEditFormState);

  useEffect(() => {
    // Kiểm tra và đảm bảo todo không phải là null trước khi setEditForm
    if (todo) {
      setEditForm({
        _id: (todo._id !== null) ? todo._id : '',
        name: (todo.name !== null) ? todo.name : '',
        description: (todo.description !== null) ? todo.description : '',
        label: (todo.label !== null) ? todo.label : 'pending',
      });
    }
  }, [todo]);
  
  const { name, description, label } = editForm;

  const handleChangeEditForm = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
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
    // setEditForm({ name: '', description: '', label: '' });
  };

  return (
    <div className={`${styles.container} ${showEditModal ? "" : "d-none"}`}>
      <div className={styles.overlay}>
        <form className={styles.editTodoForm} onSubmit={handleEditTodo}>
          <div className={styles.closeButtonContainer} onClick={() => setShowEditModal(false)}>
            <i className={`fa-solid fa-xmark ${styles.closeButton}`}></i>
          </div>
          <div className={styles.header}>
            <h1 className={styles.title}>
              EDIT TODO
            </h1>
          </div>
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
                placeholder="Enter your Todo name"
              />
            </div>
            <div className='formElements'>
              <label htmlFor="description" className="label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={handleChangeEditForm}
                className='formElementInput descriptionHeight resize-none'
                placeholder="Enter your description"
              ></textarea>
            </div>
            <div className='formElements'>
              <label htmlFor="label" className="label">
                Label
              </label>
              <div>
                <select id="label" name="label" className='formElementInput' value={label} onChange={handleChangeEditForm}>
                  <optgroup label="Choose your label">
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </optgroup>
                </select>
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className="cancelButton"
              onClick={() => setShowEditModal(false)}
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

export default memo(EditTodoForm);
