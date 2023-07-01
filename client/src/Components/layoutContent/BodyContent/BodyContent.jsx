import { useContext, useState } from "react";
import { toast } from 'react-toastify';
import { TodosContext } from "../../../Context/TodosContext";
import TodoItem from "../TodoItem";
import styles from './BodyContent.module.css'

const BodyContent = () => {
  const [filter, setFilter] = useState('all');
  const { setShowAddModal, filterTodos } = useContext(TodosContext);

  const handleChangeFilter = async (e)=> {
    setFilter(e.target.value);
    try {
      await filterTodos(e.target.value);
    } catch (error) {
      toast.error('Server Error');
    }
  }

  return (
    <div>
      <div className={styles.filterContainer}>
        <select name="label" id="label" value = {filter} onChange={handleChangeFilter} className={styles.filter}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <div className={styles.todoList}>
        <TodoItem />
      </div>
      <div className={styles.addButtonContainer}>
        {/* <p className={styles.toolTip}>
          Add new todo
        </p> */}
        <i
          className={`fa-solid fa-plus ${styles.addButton}`}
          onClick={() => setShowAddModal(true)}
        >
        </i>
      </div>
    </div>
  );
};

export default BodyContent;
