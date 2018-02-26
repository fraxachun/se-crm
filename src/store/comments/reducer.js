
import { createReducerAsync } from 'redux-act-async';
import fetchComments from './actions';

export default createReducerAsync(fetchComments);
