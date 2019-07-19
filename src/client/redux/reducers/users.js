import { USERS_AC } from '../actions/users';

const appReducerInitState = { loading: false };

export default (state = appReducerInitState, action) => {
  switch (action.type) {
    case USERS_AC.FETCH_SEND:
      return { loading: true };
    case USERS_AC.FETCH_RCWD:
      return { ...state, loading: false, ...action };
    default:
      return state;
  }
};
