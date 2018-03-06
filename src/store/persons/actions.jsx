import { createActionAsync } from 'redux-act-async';
import httpClient from '../httpClient';

const fetchPersons = createActionAsync(
  'fetchPersons',
  () => httpClient
    .get('/persons')
    .then(res => res.data),
);

const savePerson = createActionAsync(
  'savePerson',
  (person, values) => httpClient
    .put(`/persons/${person.id}`, values)
    .then(res => res.data),
);

export {
  fetchPersons,
  savePerson,
};
