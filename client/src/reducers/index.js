import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import cardReducer from './cardReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  card: cardReducer
});
