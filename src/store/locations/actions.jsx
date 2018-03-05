import { createActionAsync } from 'redux-act-async';
import httpClient from '../httpClient';

const fetchLocations = createActionAsync(
  'fetchLocations',
  () => httpClient
    .get('/locations')
    .then(res => res.data),
);

export default fetchLocations;
