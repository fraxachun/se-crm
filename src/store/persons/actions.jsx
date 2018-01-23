import { createAction } from 'redux-act';
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
  values => httpClient
    .put(`/persons/${values.id}`, values)
    .then(res => res.data),
);

const editPerson = createAction('editPerson');

export {
  fetchPersons,
  editPerson,
  savePerson,
};
