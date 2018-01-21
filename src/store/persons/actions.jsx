import { createActionAsync } from 'redux-act-async';
import httpClient from '../httpClient';

export default createActionAsync(
  'fetchPersons',
  () => httpClient.get('/persons').then(res => res.data),
);
