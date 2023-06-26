import { CREATE_TODO, DELETE_TODO, EDIT_TODO, GET_ALL_TODOS, SEARCH_TODO } from "./constant";

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
        case CREATE_TODO:
            return {
                ...state,
                todos: [...state.todos, payload]
            }
        case EDIT_TODO:
            return {
                ...state
            }
        case DELETE_TODO: 
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id != payload)
            }
        case SEARCH_TODO: 
            return {
                todos: payload
            }
        default: 
            console.log('Invalid case');
    }
}