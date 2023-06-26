import { useContext, useState } from "react"; 
import { TodosContext } from "../../Context/TodosContext";
import TodoItem from "./TodoItem";
import AddTodoForm from '../Form/AddTodoForm';
import EditTodoForm from '../Form/EditTodoForm';

const BodyContent = ()=> {

    const { setShowAddModal } = useContext(TodosContext);

    return (
        <div>
            <div className="flex flex-wrap">
                <TodoItem />    
            </div>
            <div className="absolute bottom-8 right-0">
                <p className="bg-sky-400 text-white px-[5px] py[2px] rounded-[5px] mb-2">Add new todo</p>
                <i className="fa-solid fa-plus cursor-pointer bg-sky-400 text-white rounded-[50%] text-[20px] p-[15px] hover:scale-125 ease-[500]" onClick={()=> setShowAddModal(true)}></i>
            </div>
            <AddTodoForm />
            <EditTodoForm />
        </div>
    );
}

export default BodyContent;