
import { createReducerAsync } from 'redux-act-async';
import fetchLocations from './actions';

const defaultValues = {
  loading: false,
  request: null,
  data: [],
  error: null,
};

export default createReducerAsync(fetchLocations, defaultValues);
