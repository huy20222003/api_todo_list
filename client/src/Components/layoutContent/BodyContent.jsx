import { useContext, useState } from "react";
import { toast } from 'react-toastify';
import { TodosContext } from "../../Context/TodosContext";
import TodoItem from "./TodoItem";

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
      <div className="mt-10 ml-5">
        <select name="label" id="label" value = {filter} onChange={handleChangeFilter} className="border-2 border-gray-400 p-1 rounded-md outline-none">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <div className="flex flex-wrap">
        <TodoItem />
      </div>
      <div className="absolute bottom-8 right-0">
        <p className="bg-sky-400 text-white px-[5px] py[2px] rounded-[5px] mb-2">
          Add new todo
        </p>
        <i
          className="fa-solid fa-plus cursor-pointer bg-sky-400 text-white rounded-[50%] text-[20px] p-[15px] hover:scale-125 ease-[500] relative"
          onClick={() => setShowAddModal(true)}
        >
        <span
            className="tooltip absolute hidden bg-black text-white text-xs px-2 py-1 rounded-md -left-1/2 transform -translate-x-1/2 bottom-full"
            data-tooltip="Add new Todo"
            >
            Add new Todo
        </span>
        </i>
      </div>
    </div>
  );
};

export default BodyContent;
