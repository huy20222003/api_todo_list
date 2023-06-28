import { useEffect, useContext } from "react";
import { TodosContext } from "../../Context/TodosContext";

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

  const handleDeleteTodo = (todoId) => {
    deleteTodos(todoId);
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
          className="border-2 border-blue-500 rounded-md my-3 mx-3 shadow-md w-[340px] sm:w-52 h-40 relative p-2"
        >
          <div>
            <h3 className="font-medium">{todo.name}</h3>
          </div>
          <div className="mt-1">
            <p className="text-sm">{todo.description}</p>
          </div>
          <div className="absolute bottom-1 text-center flex">
            <p className="bg-blue-300 text-white px-2 rounded">{todo.label}</p>
            <div>
              <i
                className="fa-solid fa-pen text-base mx-7 cursor-pointer text-blue-400"
                onClick={() => handleEditTodoId(todo._id)}
              ></i>
              <i
                className="fa-solid fa-trash cursor-pointer text-red-500"
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
