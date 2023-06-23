import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TodosContext } from "../../Context/TodosContext";

const AddTodoForm = () => {
  const { showAddModal, setShowAddModal, createTodo } = useContext(TodosContext);
  const navigate = useNavigate();
  const [addForm, setAddForm] = useState({
    name: "",
    description: "",
    label: ""
  });
  const { name, description, label } = addForm;

  const handleChangeAddForm = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    try {
      const addData = await createTodo(addForm);
      if (!addData.status) {
        console.log('An error has occurred');
      }
    } catch (error) {
      console.log(error);
    }
    setShowAddModal(false);
    setAddForm({name: '', description: '', label: ''});
  };

  return (
    <div className={`fixed top-0 right-0 bottom-0 left-0 z-10 ${showAddModal ? "" : "hidden"}`}>
      <div className="absolute w-full h-full bg-slate-300">
        <form className="bg-white rounded-lg w-96 text-center h-fit py-3 relative top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]" onSubmit={handleCreateTodo}>
          <div className="text-right" onClick={() => setShowAddModal(false)}>
            <i className="fa-solid fa-xmark mr-5 text-xl text-slate-500 hover:text-black cursor-pointer"></i>
          </div>
          <div className="my-7">
            <h1 className="text-2xl font-semibold indent-1">
              ADD TODO
            </h1>
          </div>
          <div>
            <div className="mb-3">
              <span className="block font-normal text-black text-left text-sm ml-[44px] mb-1">
                Name
              </span>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChangeAddForm}
                className="border-2 rounded border-slate-500 p-2 w-[300px]"
                placeholder="Enter your name Todo"
              />
            </div>
            <div className="mb-3">
              <span className="block font-normal text-black text-left text-sm ml-[44px] mb-1">
                Description
              </span>
              <input
                type="text"
                name="description"
                value={description}
                onChange={handleChangeAddForm}
                className="border-2 rounded border-slate-500 p-2 w-[300px]"
                placeholder="Enter your description"
              />
            </div>
            <div className="mb-3">
              <span className="block font-normal text-black text-left text-sm ml-[44px] mb-1">
                Label
              </span>
              <div>
                <select name="label" className="border-2 border-gray-500 p-1 rounded-md" value={label} onChange={handleChangeAddForm}>
                  <option value="">Your label</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>
          </div>
          <div className="my-3">
            <button
              type="submit"
              className="text-white bg-fuchsia-500 text-center rounded-full w-[300px] h-10"
            >
              Add Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTodoForm;
