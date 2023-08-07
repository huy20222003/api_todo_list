import { useContext, useState, memo, useEffect } from 'react';
import { toast } from 'react-toastify';
import { TodosContext } from '../../../Context/TodosContext';
import { LabelsContext } from '../../../Context/LabelsContext';
import styles from './EditTodoForm.module.css';
import FormInput from '../FormInput';
import Button from '../../Button';

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
            <FormInput
              textName='name'
              type='text'
              icon='fa-solid fa-list-ol'
              value={name}
              required={true}
              onChange={handleChangeEditForm}
              placeholder='Enter your todo name'
            />
            <FormInput
              textName='description'
              type='text'
              icon='fa-solid fa-paragraph'
              value={description}
              required={true}
              textarea={true}
              onChange={handleChangeEditForm}
              placeholder='Enter your todo description'
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
            <Button
              textName='Cancel'
              type='button'
              onClick={handleCancel}
              size='small'
              color='error'
            />
            <Button
              textName='Edit'
              type='submit'
              size='small'
              color='primary'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(EditTodoForm);
