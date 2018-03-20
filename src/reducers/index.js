import { combineReducers } from 'redux';
import set from './set';
import data from './data';

export default combineReducers({
  set,
  data,
});
