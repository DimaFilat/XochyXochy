import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import usersReducer from './users';

export default combineReducers({
  usersReducer,
  form: formReducer
});
