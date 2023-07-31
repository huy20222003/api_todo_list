import {
  useReducer,
  useState,
  createContext,
  useEffect,
  useCallback,
} from 'react';
import axios from 'axios';
import { initTodosState, reducer } from '../Reducer/TodosReducer/reducer';
import { Api_URL } from '../constant';
import {
  getAllTodos,
  createTodo,
  editTodo,
  deleteTodo,
  searchTodo,
  filterTodo,
  setTodo,
} from '../Reducer/TodosReducer/action';

export const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [todoState, dispatch] = useReducer(reducer, initTodosState);

  const handleError = (error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { status: false, message: error.message };
    }
  };

  const getAll = useCallback(async () => {
    try {
      const response = await axios.get(`${Api_URL}/todos/all`);
      if (response.data.status) {
        dispatch(getAllTodos(response.data.todos));
      }
    } catch (error) {
      return handleError(error);
    }
  }, []);

  useEffect(() => {
    getAll();
  }, [getAll]);

  const createTodos = useCallback(async (TodoData) => {
    try {
      const response = await axios.post(`${Api_URL}/todos/create`, TodoData);
      dispatch(createTodo(response.data.newTodo));
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const editTodos = useCallback(async (editForm) => {
    try {
      const response = await axios.put(
        `${Api_URL}/todos/edit/${editForm._id}`,
        editForm
      );
      dispatch(editTodo(editForm));
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const deleteTodos = useCallback(async (todoId) => {
    try {
      const response = await axios.delete(`${Api_URL}/todos/delete/${todoId}`);
      dispatch(deleteTodo(todoId));
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const searchTodos = useCallback(async (searchValue) => {
    try {
      const response = await axios.get(
        `${Api_URL}/todos/search?name=${searchValue}`
      );
      dispatch(searchTodo(response.data.todo));
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const filterTodos = useCallback(
    async (label) => {
      if (label === 'all') {
        await getAll();
      } else {
        try {
          const response = await axios.get(
            `${Api_URL}/todos/filter?label=${label}`
          );
          dispatch(filterTodo(response.data.todo));
          return response.data;
        } catch (error) {
          return handleError(error);
        }
      }
    },
    [getAll]
  );

  const setTodos = useCallback(
    (todoId) => {
      const todo = todoState.todos.find((todo) => todo._id === todoId);
      dispatch(setTodo(todo));
    },
    [todoState.todos]
  );

  const TodosContextData = {
    showAddModal,
    setShowAddModal,
    showEditModal,
    setShowEditModal,
    todoState,
    showModalDelete,
    setShowModalDelete,
    getAll,
    createTodos,
    editTodos,
    deleteTodos,
    searchTodos,
    filterTodos,
    setTodos,
  };

  return (
    <TodosContext.Provider value={TodosContextData}>
      {children}
    </TodosContext.Provider>
  );
};
