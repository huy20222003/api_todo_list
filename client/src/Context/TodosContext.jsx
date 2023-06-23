import { useReducer, useState } from "react";
import { createContext } from "react";
import axios from 'axios';
import { initTodosState, reducer } from "../Reducer/TodosReducer/reducer";
import { Api_URL, LOCAL_STORAGE_TOKEN_NAME } from "../constant";
import { setTodo, getAllTodos } from "../Reducer/TodosReducer/action";


export const TodosContext = createContext();

export const TodosProvider = ({children})=> {

    const [showAddModal, setShowAddModal] = useState(false);
    const [todoState, dispatch] = useReducer(reducer, initTodosState);

    const setTodos = (data)=> {
        dispatch(setTodo(data));
    }

    const getAll = async ()=> {
        try {
            const response = await axios.get(`${Api_URL}/todos/all`);
            if(response.data.status) {
                dispatch(getAllTodos(response.data.todos))
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
    }

    //create
    const createTodo = async (TodoData)=> {
        try {
            const response = await axios.post(`${Api_URL}/todos/create`, TodoData);
            console.log(response);
            await getAll();
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

    //search
    const searchTodo = async (searchValue)=> {
        try {
            const response = await axios.post(`${Api_URL}/todos/search?name=${searchValue}`);

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

    const TodosContextData = {
        showAddModal,
        setShowAddModal,
        todoState,
        setTodos,
        getAll,
        createTodo,
        searchTodo
    }

    return (
        <TodosContext.Provider value={ TodosContextData }>
            {children}
        </TodosContext.Provider>
    );
}