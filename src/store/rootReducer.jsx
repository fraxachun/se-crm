import { combineReducers } from 'redux';
import persons from './persons/reducer';
import locations from './locations/reducer';
import comments from './comments/reducer';

export default combineReducers({
  persons,
  comments,
  locations,
});
