import { useState, useContext, useCallback, useRef, memo } from 'react';
import { toast } from 'react-toastify';
import { TodosContext } from '../../../Context/TodosContext';
import Modal from '../../Form/Modal';
import styles from './TodoItem.module.css';

const TodoItem = () => {
  const {
    deleteTodos,
    setShowEditModal,
    setTodos,
    todoState: { todos },
  } = useContext(TodosContext);

  const containerRef = useRef();

  const [id, setId] = useState('');
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleDeleteTodo = (todoId) => {
    setId(todoId);
    setShowModalDelete(true);
  };

  const handleSubmitDelete = useCallback(async () => {
    try {
      const deleteData = await deleteTodos(id);
      if (!deleteData.success) {
        toast.error('Delete Failed!');
      } else {
        toast.success('Deleted Successfully!');
      }
    } catch (error) {
      toast.error('Server Error');
    }
    setShowModalDelete(false);
  }, [id]);
  const handleClose = () => {
    setShowModalDelete(false);
  };

  const handleEditTodoId = (todoId) => {
    setTodos(todoId);
    setShowEditModal(true);
  }; 

  return (
    <>
      {todos.map((todo, index) => (
        <div key={todo._id} className={styles.container} ref={containerRef} >
          <div>
            <h3 className={styles.todoName}>{todo.name}</h3>
          </div>
          <div className={styles.todoDescriptionConatiner}>
            <p className={styles.todoDescription}>
              {todo.description.length > 70
                ? `${todo.description.substring(0, 50)}...`
                : todo.description}
            </p>
          </div>
          <div className={styles.todoFooterContainer}>
            <p className={styles.todoLabel}>{todo.label}</p>
            <div>
              <i
                className={`fa-solid fa-pen ${styles.todoPencil}`}
                onClick={() => handleEditTodoId(todo._id)}
              ></i>
              <i
                className={`fa-solid fa-trash ${styles.todoTrash}`}
                onClick={() => handleDeleteTodo(todo._id)}
              ></i>
            </div>
          </div>
        </div>
      ))}
      <Modal
        header={'Delete'}
        message={'Are you sure you want to delete?'}
        handleDelete={handleSubmitDelete}
        handleClose={handleClose}
        showModalDelete={showModalDelete}
      />
    </>
  );
};

export default memo(TodoItem);
