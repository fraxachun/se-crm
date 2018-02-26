import { combineReducers } from 'redux';
import persons from './persons/reducer';
import comments from './comments/reducer';

export default combineReducers({
  persons,
  comments,
});
