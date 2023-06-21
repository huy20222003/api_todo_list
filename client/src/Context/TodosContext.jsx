import { useReducer } from "react";
import { createContext } from "react";
import axios from 'axios';
import { initTodosState, reducer } from "../Reducer/TodosReducer/reducer";
import { Api_URL } from "../constant";
import { getAllTodos } from "../Reducer/TodosReducer/action";

export const TodosContext = createContext();

export const TodosProvider = ({children})=> {
    const [todoState, dispatch] = useReducer(reducer, initTodosState);

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

    return (
        <TodosContext.Provider value={ TodosContextData }>
            {children}
        </TodosContext.Provider>
    );
}