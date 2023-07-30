import React, { useContext, useState, useEffect, memo, Suspense } from "react";
import { toast } from 'react-toastify';
import { TodosContext } from "../../../Context/TodosContext";
import { LabelsContext } from "../../../Context/LabelsContext";
const TodoItem = React.lazy(()=> import ("../TodoItem"));
import Loader from "../../Loader/Loader";
import styles from './BodyContent.module.css'

const BodyContent = () => {
  const [filter, setFilter] = useState('all');
  const { setShowAddModal, filterTodos } = useContext(TodosContext);
  const { getAllLabels, labelState: {labels} } = useContext(LabelsContext);

  const handleChangeFilter = async (e)=> {
    setFilter(e.target.value);
    try {
      await filterTodos(e.target.value);
    } catch (error) {
      toast.error('Server Error');
    }
  }

  useEffect(()=>{
    getAllLabels();
  }, []);

  return (
    <div>
      <div className={styles.filterContainer}>
        <select name="label" id="label" value = {filter} onChange={handleChangeFilter} className={styles.filter}>
          <option value="all">All</option>
          {labels.map((label)=>(
            <option key={label._id} name={label.name}>{label.name}</option>
          ))}
        </select>
      </div>
      <div className={styles.todoList}>
        <Suspense fallback = {<Loader />}>
          <TodoItem />
        </Suspense>
      </div>
      <div className={styles.addButtonContainer}>
        <span data-tooltip="Add new Todo!" data-flow="top">
          <i
            className={`fa-solid fa-plus ${styles.addButton}`}
            onClick={() => setShowAddModal(true)}
          >
          </i>
        </span>
      </div>
    </div>
  );
};

export default memo(BodyContent);
