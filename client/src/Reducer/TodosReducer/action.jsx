import { GET_ALL_TODOS } from "./constant";

export const getAllTodos = (payload)=> {
    return {
        type: GET_ALL_TODOS,
        payload
    };
}