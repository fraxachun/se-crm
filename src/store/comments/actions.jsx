import { createActionAsync } from 'redux-act-async';
import httpClient from '../httpClient';
import { fetchLocations } from '../locations/actions';
import { fetchPersons } from '../persons/actions';

const fetchComments = createActionAsync(
  'fetchComments',
  (params) => {
    let path = '/comments';
    if (params.personId) {
      path += `?personId=${params.personId}`;
    } else if (params.locationId) {
      path += `?locationId=${params.locationId}`;
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
        dispatch(fetchPersons());
        dispatch(fetchLocations());
      },
    },
  },
);

export {
  fetchComments,
  addComment,
};
