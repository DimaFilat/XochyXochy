import { USERS_AC } from '../actions/users';

const appReducerInitState = { loading: false, auth: false };

export default (state = appReducerInitState, action) => {
  switch (action.type) {
    case USERS_AC.SENT_FETCH: {
      return { loading: true };
    }
    case USERS_AC.RCWD_FETCH: {
      return { ...state, loading: false, ...action.user };
    }
    default:
      return state;
  }
};
