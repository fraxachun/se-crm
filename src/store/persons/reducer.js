
import { createReducer } from 'redux-act';
import { fetchPersons, savePerson, editPerson } from './actions';

const defaultState = {
  status: null,
  currentPersonId: null,
  data: [],
  error: null,
};

const updatePersonInArray = (persons, person) =>
  persons.map((item, index) => {
    if (persons[index].id !== person.id) {
      return item;
    }
    return {
      ...item,
      ...person,
    };
  });

export default createReducer({
  [fetchPersons.request]: state => ({
    ...state,
    status: 'loading',
  }),
  [fetchPersons.ok]: (state, payload) => ({
    ...state,
    status: 'loaded',
    data: payload.response,
  }),
  [fetchPersons.error]: (state, payload) => ({
    ...state,
    status: 'error',
    data: [],
    error: payload.error,
  }),
  [fetchPersons.reset]: () => (defaultState),
  [savePerson.request]: (state, payload) => ({
    ...state,
    currentPersonId: payload.id,
    status: 'saving',
  }),
  [savePerson.ok]: (state, payload) => ({
    ...state,
    status: 'saved',
    currentPersonId: payload.response.id,
    data: updatePersonInArray(state.data, payload.response),
  }),
  [fetchPersons.error]: (state, payload) => ({
    ...state,
    status: 'error',
    data: [],
    error: payload.error,
  }),
  [editPerson]: (state, payload) => ({
    ...state,
    status: payload ? 'editing' : 'loaded',
    currentPersonId: payload,
  }),
  [fetchPersons.reset]: () => (defaultState),
}, defaultState);
