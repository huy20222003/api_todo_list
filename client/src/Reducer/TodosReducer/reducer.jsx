import {
  CREATE_TODO,
  DELETE_TODO,
  EDIT_TODO,
  FILTER_TODO,
  GET_ALL_TODOS,
  SEARCH_TODO,
  SET_TODO,
} from './constant';

export const initTodosState = {
  todo: null,
  todos: [],
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_TODOS:
      return {
        ...state,
        todos: payload,
        totalPages: action.payload.totalPages,
      };
    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, payload],
      };
    case EDIT_TODO:
      const newTodo = state.todos.map((todo) =>
        todo._id === payload._id ? payload : todo
      );
      return {
        ...state,
        todos: newTodo,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id != payload),
      };
    case SEARCH_TODO:
      return {
        todos: payload,
      };
    case FILTER_TODO:
      return {
        todos: payload,
      };
    case SET_TODO:
      return {
        ...state,
        todo: payload,
      };
    default:
      return {
        ...state,
      };
  }
};
