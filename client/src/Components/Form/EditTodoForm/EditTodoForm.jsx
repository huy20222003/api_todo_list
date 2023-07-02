import { useContext, useState, memo } from "react";
import { toast } from 'react-toastify';
import { TodosContext } from "../../../Context/TodosContext";
import styles from './EditTodoForm.module.css'

const EditTodoForm = () => {
  const { showEditModal, setShowEditModal, id, editTodos, todoState: {todos} } = useContext(TodosContext);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    label: ""
  });
  
  const { name, description, label } = editForm;

  const handleChangeEditForm = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditTodo = async (e) => {
    e.preventDefault();
    try {
      const editData = await editTodos(id, editForm);
      if (!editData.status) {
        toast.error('Edit todo failed');
      }
      toast.success('Edit todo successfully!');
    } catch (error) {
      toast.error('Server error');
    }
    setShowEditModal(false);
    setEditForm({ name: '', description: '', label: '' });
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
                  <option value="">Choose your label</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
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
