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

export default fetchComments;
