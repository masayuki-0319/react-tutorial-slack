import { SET_USER } from './types';
import { User } from '../types/User';

export const setUser = (user: User) => {
  return {
    type: SET_USER,
    payload: {
      currentUser: user,
    },
  };
};
