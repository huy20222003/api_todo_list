import { GET_ALL_TODOS } from "./constant";

export const initTodosState = {
    todo: null,
    todos: []
}

export const reducer = (state, action)=> {
    const {type, payload} = action;
    switch(type) {
        case GET_ALL_TODOS: 
            return {
                ...state,
                todos: payload
            }
    }
}