import { CREATE_TODO, DELETE_TODO, EDIT_TODO, GET_ALL_TODOS, SEARCH_TODO, SET_TODO } from "./constant";

export const initTodosState = {
    todo: null,
    todos: []
}

export const reducer = (state, action)=> {
    const {type, payload} = action;

    switch(type) {
        case SET_TODO: 
            return {
                ...state,
                todo: payload
            }
        case GET_ALL_TODOS: 
            return {
                ...state,
                todos: payload
            }
        case CREATE_TODO:
            return {
                ...state,
                todo: payload,
                todos: [...todos, todo]
            }
        case EDIT_TODO:
            return {
                ...state
            }
        case DELETE_TODO: 
            return {

            }
        case SEARCH_TODO: 
            return {
                todos: payload
            }
        default: 
            console.log('Invalid case');
    }
}