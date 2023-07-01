import { useEffect, useContext } from "react";
import { TodosContext } from "../../../Context/TodosContext";
import styles from './TodoItem.module.css';
import { toast } from 'react-toastify';

const TodoItem = () => {
  const {
    getAll,
    deleteTodos,
    setShowEditModal,
    id,
    setId,
    todoState: { todos },
  } = useContext(TodosContext);

  useEffect(() => {
    getAll();
  }, []);

  const handleDeleteTodo = async (todoId) => {
    try {
      const deleteData = await deleteTodos(todoId);
      if(!deleteData.status) {
        toast.error('Delete Failed!');
      } else {
        toast.success('Deleted Successful!');
      }
    } catch (error) {
      toast.error('Server Error');
    }
  };

  const handleEditTodoId = (todoId) => {
    setId(todoId);
    setShowEditModal(true);
  };

  return (
    <>
      {todos.map((todo) => (
        <div
          key={todo._id}
          className={styles.container}
        >
          <div>
            <h3 className={styles.todoName}>{todo.name}</h3>
          </div>
          <div className={styles.todoDescriptionContainer}>
            <p className={styles.todoDescription}>{todo.description}</p>
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
    </>
  );
};

export default TodoItem;
