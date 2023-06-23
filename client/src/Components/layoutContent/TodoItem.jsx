import { useEffect, useContext } from "react";
import { TodosContext } from "../../Context/TodosContext";

const TodoItem = ()=> {
    const {getAll, todoState: {
        todos
    }} = useContext(TodosContext);

    useEffect(()=>{getAll()}, []);

    return (
        <>
            {todos.map((todo)=>{
                return (
                    <div key={todo._id} className="border-2 border-gray-500 rounded-md my-3 mx-3 shadow-md w-52 h-40 relative p-2">
                        <div>
                            <h3 className="font-medium">{todo.name}</h3>
                        </div>
                        <div className="mt-1">
                            <p className="text-sm">{todo.description}</p>
                        </div>
                        <div className="absolute bottom-1 rounded text-center bg-slate-400 px-2">
                            <p>{todo.label}</p>
                        </div>
                    </div>
                )
            })}
        </>
    );
}
export default TodoItem;