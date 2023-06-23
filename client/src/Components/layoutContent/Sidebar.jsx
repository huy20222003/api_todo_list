import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { TodosContext } from "../../Context/TodosContext";
import AddTodoForm from "../Form/AddTodoForm";

const Sidebar = ()=> {
    const { authState } = useContext(AuthContext);
    const { user } = authState;
    const { showAddModal, setShowAddModal } = useContext(TodosContext);
    console.log(showAddModal);
    
    return (
        <div className="w-72 border-r-2 border-r-gray-400 min-h-screen">
                <div className="text-right mr-4 mt-2 mb-5">
                   <i className="fa-solid fa-bars text-2xl cursor-pointer"></i>
                </div>
                <div className="text-center mt-16">
                    <img className="rounded-full w-24 m-auto border-2 border-gray-400" src={user.image} alt="avatar" />
                    <h1 className="mt-3 text-base let tracking-[1px]">{user.username}</h1>
                </div>
                <div className="mt-6 ml-5">
                    <div className="cursor-pointer" onClick={()=>setShowAddModal(true)}>
                        <i className="fa-solid fa-pen text-base pr-3"></i>
                        <span className="text-lg">Create Todo</span>
                    </div>
                </div>
                <AddTodoForm />
           </div> 
    );
}

export default Sidebar;