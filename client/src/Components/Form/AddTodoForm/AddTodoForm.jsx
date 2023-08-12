import { useContext, useState, memo, useCallback } from 'react';
import { toast } from 'react-toastify';
import { TodosContext } from '../../../Context/TodosContext';
import { LabelsContext } from '../../../Context/LabelsContext';
import { UserContext } from '../../../Context/UserContext';
import styles from './AddTodoForm.module.css';
import FormInput from '../FormInput';
import Button from '../../Button';

const AddTodoForm = () => {
  const { showAddModal, setShowAddModal, createTodos } =
    useContext(TodosContext);
  const { encodeDesc } = useContext(UserContext);
  const {
    labelState: { labels },
  } = useContext(LabelsContext);
  const [addTodoForm, setAddTodoForm] = useState({
    name: '',
    description: '',
    label: '',
  });
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = async () => {
    setIsChecked(!isChecked);
  };

  const handleChange = useCallback((e) => {
    setAddTodoForm({ ...addTodoForm, [e.target.name]: e.target.value });
  });

  const { name, description, label } = addTodoForm;

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    try {
      const addData = await createTodos(addTodoForm);
      if (!addData.success) {
        toast.error('Add Todo failed');
      } else {
        toast.success('Add Todo successfully!');
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
            <h1 className={styles.title}>ADD Todo</h1>
          </div>
          <div>
            <FormInput
              textName="name"
              type="text"
              icon="fa-solid fa-list-ol"
              value={name}
              required={true}
              onChange={handleChange}
              placeholder="Enter your Todo name"
            />
            <FormInput
              textName="description"
              type="text"
              icon="fa-solid fa-paragraph"
              value={description}
              textarea={true}
              onChange={handleChange}
              placeholder="Enter your description"
            />
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
                  required={true}
                  onChange={handleChange}
                >
                  {renderLabelOptions()}
                </select>
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Button
              textName="Cancel"
              type="button"
              onClick={handleCloseForm}
              size="small"
              color="error"
            />
            <Button textName="Add" type="submit" size="small" color="primary" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(AddTodoForm);
