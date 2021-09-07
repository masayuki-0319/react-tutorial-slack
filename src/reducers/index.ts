import { combineReducers } from 'redux';
import { ActionTypes, SET_USER } from '../actions/types';
import { User } from '../types/User';

type State = {
  currentUser: User | null;
  isLoading: boolean;
};

const initialState: State = {
  currentUser: null,
  isLoading: true,
};

const user_reducer = (state: State = initialState, action: ActionTypes) => {
  switch (action.type) {
    case SET_USER:
      return {
        currentUser: action.payload.currentUser,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  user: user_reducer,
});
