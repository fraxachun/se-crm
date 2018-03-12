import { createActionAsync } from 'redux-act-async';
import httpClient from '../httpClient';

const fetchLocations = createActionAsync(
  'fetchLocations',
  () => httpClient
    .get('/locations')
    .then(res => res.data),
);

const saveLocation = createActionAsync(
  'saveLocation',
  (location, values) => httpClient
    .put(`/locations/${location.id}`, values)
    .then(res => res.data),
  {
    ok: {
      callback: dispatch => dispatch(fetchLocations()),
    },
  },
);

export {
  fetchLocations,
  saveLocation,
};
