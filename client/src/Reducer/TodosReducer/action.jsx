import { CREATE_TODO, DELETE_TODO, EDIT_TODO, GET_ALL_TODOS, SEARCH_TODO } from "./constant";

export const getAllTodos = (payload)=> {
    return {
        type: GET_ALL_TODOS,
        payload
    };
}

export const createTodo = (payload)=> {
    return {
        type: CREATE_TODO,
        payload
    };
}

export const editTodo = (payload)=> {
    return {
        type: EDIT_TODO,
        payload
    };
}

export const deleteTodo = (payload)=> {
    return {
        type: DELETE_TODO,
        payload
    };
}

export const searchTodo = (payload)=> {
    return {
        type: SEARCH_TODO,
        payload
    };
}