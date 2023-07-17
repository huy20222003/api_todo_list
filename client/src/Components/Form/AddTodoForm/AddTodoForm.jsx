import { useContext, useState, memo } from "react";
import { toast } from 'react-toastify';
import { TodosContext } from "../../../Context/TodosContext";
import { LabelsContext } from "../../../Context/LabelsContext";
import styles from './AddTodoForm.module.css';

const AddTodoForm = () => {
  const { showAddModal, setShowAddModal, createTodos } = useContext(TodosContext);
  const {labelState: { labels }} = useContext(LabelsContext);
  const [addForm, setAddForm] = useState({
    name: "",
    description: "",
    label: ""
  });
  const { name, description, label } = addForm;

  const handleChangeAddForm = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    try {
      const addData = await createTodos(addForm);
      if (!addData.status) {
        toast.error('Add todo failed');
      } else {
        toast.success('Add todo successfully!');
      }
    } catch (error) {
      toast.error('Server Error');
    }
    setShowAddModal(false);
    setAddForm({ name: '', description: '', label: '' });
  };

  return (
    <div className={`${styles.container} ${showAddModal ? "" : "d-none"}`}>
      <div className={styles.overlay}>
        <form className={styles.addTodoForm} onSubmit={handleCreateTodo}>
          <div className={styles.closeButtonContainer} onClick={() => setShowAddModal(false)}>
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
                onChange={handleChangeAddForm}
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
                onChange={handleChangeAddForm}
                className='formElementInput descriptionHeight resize-none'
                placeholder="Enter your description"
              ></textarea>
            </div>
            <div className='formElements'>
              <label htmlFor="label" className='label'>
                Label
              </label>
              <div>
                <select id="label" name="label" className="formElementInput" value={label} onChange={handleChangeAddForm}>
                  <option value="" disabled = {true}>Choose your label</option>
                  {labels.map((label)=>(
                    <option key={label._id} name={label.name}>{label.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className="cancelButton"
              onClick={() => setShowAddModal(false)}
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
