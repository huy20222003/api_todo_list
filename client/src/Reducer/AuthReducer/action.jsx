import { SET_AUTH } from './constants';

export const setAuth = (payload) => {
  return {
    type: SET_AUTH,
    payload,
  };
};
