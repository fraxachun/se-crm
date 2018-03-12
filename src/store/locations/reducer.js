import { createReducerAsync } from 'redux-act-async';
import { combineReducers } from 'redux';

import { fetchLocations, saveLocation } from './actions';

const defaultValues = {
  loading: false,
  request: null,
  data: [],
  error: null,
};

export default combineReducers({
  locations: createReducerAsync(fetchLocations, defaultValues),
  saveLocation: createReducerAsync(saveLocation),
});
