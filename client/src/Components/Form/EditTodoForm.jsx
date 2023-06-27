import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { TodosContext } from "../../Context/TodosContext";

const EditTodoForm = () => {
  const { showEditModal, setShowEditModal, id, editTodos } = useContext(TodosContext);
  const navigate = useNavigate();
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    label: ""
  });
  const { name, description, label } = editForm;

  const handleChangeEditForm = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditTodo = async (e) => {
    e.preventDefault();
    try {
      const editData = await editTodos(id, editForm);
      if (!editData.status) {
        toast.error('Edit todo failed');
      }
      toast.success('Edit todo successfully!');
    } catch (error) {
      toast.error('Server error');
    }
    setShowEditModal(false);
    setEditForm({ name: '', description: '', label: '' });
  };

  return (
    <div className={`fixed top-0 right-0 bottom-0 left-0 z-10 ${showEditModal ? "" : "hidden"}`}>
      <div className="absolute w-full h-full bg-black bg-opacity-50">
        <form className="bg-white rounded-lg w-[340px] lg:w-96 sm:w-[350px] text-center h-fit py-3 relative top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]" onSubmit={handleEditTodo}>
            <div className="text-right" onClick={() => setShowEditModal(false)}>
                <i className="fa-solid fa-xmark mr-5 text-xl text-slate-500 hover:text-black cursor-pointer"></i>
            </div>
            <div className="my-7">
                <h1 className="text-xl lg:text-2xl font-semibold ml-2">
                EDIT TODO
                </h1>
            </div>
            <div>
                <div className="mb-3 w-full">
                    <label htmlFor="name" className="block font-normal text-black text-left text-sm ml-[44px] mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleChangeEditForm}
                        className="border-2 rounded border-slate-500 p-2 w-4/5"
                        placeholder="Enter your Todo name"
                    />
                </div>
                <div className="mb-3 w-full">
                    <label htmlFor="description" className="block font-normal text-black text-left text-sm ml-[44px] mb-1">
                        Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleChangeEditForm}
                        className="border-2 rounded border-slate-500 p-2 w-4/5"
                        placeholder="Enter your description"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="label" className="block font-normal text-black text-left text-sm ml-[44px] mb-1">
                        Label
                    </label>
                    <div>
                        <select id="label" name="label" className="border-2 border-gray-500 p-1 rounded-md" value={label} onChange={handleChangeEditForm}>
                            <option value="">Your label</option>
                            <option value="complete">Complete</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="my-3 w-full">
            <button
                type="submit"
                className="text-white bg-fuchsia-500 hover:bg-fuchsia-600 text-center rounded-full w-4/5 h-10 transition-colors duration-300"
            >
                Edit Todo
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default EditTodoForm;
