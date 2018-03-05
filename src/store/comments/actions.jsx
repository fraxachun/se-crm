import { createActionAsync } from 'redux-act-async';
import httpClient from '../httpClient';

const fetchComments = createActionAsync(
  'fetchComments',
  (params) => {
    let path = '/comments';
    if (params.personId) {
      path += `?personId=${params.personId}`;
    }
    return httpClient
      .get(path)
      .then(res => res.data);
  },
);

const addComment = createActionAsync(
  'addComment',
  params => httpClient
    .post('/comments', params)
    .then(res => res.data),
  {
    ok: {
      callback: (dispatch, getState) => {
        dispatch(fetchComments(getState().comments.comments.request));
      },
    },
  },
);

export {
  fetchComments,
  addComment,
};
