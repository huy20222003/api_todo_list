import { CREATE_TODO, DELETE_TODO, EDIT_TODO, FILTER_TODO, GET_ALL_TODOS, SEARCH_TODO, SET_TODO } from "./constant";

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

export const filterTodo = (payload)=> {
    return {
        type: FILTER_TODO,
        payload
    }
}

export const setTodo = (payload)=> {
    return {
        type: SET_TODO,
        payload
    }
}
