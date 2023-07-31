import { useState, useContext, useEffect, useCallback, useRef, memo } from 'react';
import { toast } from 'react-toastify';
import { TodosContext } from '../../../Context/TodosContext';
import Modal from '../../Form/Modal';
import styles from './TodoItem.module.css';

const TodoItem = () => {
  const {
    getAll,
    deleteTodos,
    setShowEditModal,
    setTodos,
    todoState: { todos },
  } = useContext(TodosContext);

  const containerRef = useRef();
  const [borderColors, setBorderColors] = useState([]);

  useEffect(() => {
    getAll();
  }, [getAll]);

  const [id, setId] = useState('');
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleDeleteTodo = (todoId) => {
    setId(todoId);
    setShowModalDelete(true);
  };

  const handleSubmitDelete = useCallback(async () => {
    try {
      const deleteData = await deleteTodos(id);
      if (!deleteData.status) {
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

  function randomHexColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
  
    const hexRed = red.toString(16).padStart(2, '0');
    const hexGreen = green.toString(16).padStart(2, '0');
    const hexBlue = blue.toString(16).padStart(2, '0');
  
    const hexColor = `#${hexRed}${hexGreen}${hexBlue}`;
  
    return hexColor;
  }
  
  useEffect(() => {
    const numTodos = todos.length;
    const randomColors = Array.from({ length: numTodos }, () => randomHexColor());
    setBorderColors(randomColors);
  }, [todos]); 

  return (
    <>
      {todos.map((todo, index) => (
        <div key={todo._id} className={styles.container} ref={containerRef} style={{ borderColor: borderColors[index] }}>
          <div>
            <h3 className={styles.todoName}>{todo.name}</h3>
          </div>
          <div className={styles.todoDescriptionContainer}>
            <p className={styles.todoDescription}>
              {todo.description.length > 40
                ? `${todo.description.substring(0, 60)}...`
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
