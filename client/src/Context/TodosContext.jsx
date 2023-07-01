import { useReducer, useState, createContext } from 'react';
import axios from 'axios';
import { initTodosState, reducer } from '../Reducer/TodosReducer/reducer';
import { Api_URL } from '../constant';
import {
  getAllTodos,
  createTodo,
  editTodo,
  deleteTodo,
  searchTodo,
  filterTodo
} from '../Reducer/TodosReducer/action';

export const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [id, setId] = useState('');
  const [todoState, dispatch] = useReducer(reducer, initTodosState);

  const getAll = async () => {
    try {
      const response = await axios.get(`${Api_URL}/todos/all`);
      if (response.data.status) {
        dispatch(getAllTodos(response.data.todos));
      }
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return {
          status: false,
          message: error.message,
        };
      }
    }
  };

  // Create
  const createTodos = async (TodoData) => {
    try {
      const response = await axios.post(`${Api_URL}/todos/create`, TodoData);
      dispatch(createTodo(response.data.newTodo));
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return {
          status: false,
          message: error.message,
        };
      }
    }
  };

  // Edit todo
  const editTodos = async (todoId, editForm) => {
    try {
      const response = await axios.put(`${Api_URL}/todos/edit/${todoId}`, editForm);
      await getAll();
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return {
          status: false,
          message: error.message,
        };
      }
    }
  };

  // Delete todo
  const deleteTodos = async (todoId) => {
    try {
      const response = await axios.delete(`${Api_URL}/todos/delete/${todoId}`);
      dispatch(deleteTodo(todoId));
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return {
          status: false,
          message: error.message,
        };
      }
    }
  };

  // Search
  const searchTodos = async (searchValue) => {
    try {
      const response = await axios.get(`${Api_URL}/todos/search?name=${searchValue}`);
      dispatch(searchTodo(response.data.todo));
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return {
          status: false,
          message: error.message,
        };
      }
    }
  };

  //filter
  const filterTodos = async (label)=> {
    if(label === 'all') {
      await getAll();
    } else {
      try {
        const response = await axios.get(`${Api_URL}/todos/filter?label=${label}`);
        dispatch(filterTodo(response.data.todo));
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) {
          return error.response.data;
        } else {
          return {
            status: false,
            message: error.message,
          };
        }
      }
    }
  }

  const TodosContextData = {
    showAddModal,
    setShowAddModal,
    showEditModal,
    setShowEditModal,
    id,
    setId,
    todoState,
    getAll,
    createTodos,
    editTodos,
    deleteTodos,
    searchTodos,
    filterTodos
  };

  return <TodosContext.Provider value={TodosContextData}>{children}</TodosContext.Provider>;
};
