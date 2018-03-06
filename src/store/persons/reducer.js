import { createReducerAsync } from 'redux-act-async';
import { combineReducers } from 'redux';
import { fetchPersons, savePerson } from './actions';

const defaultValues = {
  loading: false,
  request: null,
  data: [],
  error: null,
};

export default combineReducers({
  persons: createReducerAsync(fetchPersons, defaultValues),
  savePerson: createReducerAsync(savePerson, defaultValues),
});
