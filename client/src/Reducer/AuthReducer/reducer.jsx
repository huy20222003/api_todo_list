import { SET_AUTH } from './constants';

export const initStateAuth = {
  isAuthenticated: false,
  user: null,
};

export const reducer = (state, action) => {
  const {
    type,
    payload: { isAuthenticated, user },
  } = action;

  switch (type) {
    case SET_AUTH:
      return {
        ...state,
        isAuthenticated,
        user,
      };
    default:
      return {
        ...state,
      };
  }
};
