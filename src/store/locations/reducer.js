
import { createReducerAsync } from 'redux-act-async';
import fetchLocations from './actions';

export default createReducerAsync(fetchLocations);
