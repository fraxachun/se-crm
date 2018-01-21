import { createReducerAsync } from 'redux-act-async';
import fetchPersons from './actions';

const defaultState = {
  loading: false,
  data: [],
  error: null,
};

export default createReducerAsync(fetchPersons, defaultState);
