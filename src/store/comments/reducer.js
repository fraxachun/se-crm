
import { createReducerAsync } from 'redux-act-async';
import { combineReducers } from 'redux';
import { fetchComments, addComment } from './actions';

export default combineReducers({
  comments: createReducerAsync(fetchComments),
  addComment: createReducerAsync(addComment),
});
