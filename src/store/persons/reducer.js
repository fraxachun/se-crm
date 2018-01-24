
import { createReducer } from 'redux-act';
import { fetchPersons, savePerson, showPerson, editPerson, showList } from './actions';

const defaultState = {
  status: '',
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
    status: 'loadList',
  }),
  [fetchPersons.ok]: (state, payload) => ({
    ...state,
    status: 'showList',
    data: payload.response,
  }),
  [fetchPersons.error]: (state, payload) => ({
    ...state,
    status: 'errorList',
    data: [],
    error: payload.error,
  }),
  [fetchPersons.reset]: () => (defaultState),
  [showList]: state => ({
    ...state,
    status: 'showList',
    currentPersonId: null,
  }),
  [showPerson]: (state, personId) => ({
    ...state,
    status: 'showPerson',
    currentPersonId: personId || state.currentPersonId,
  }),
  [editPerson]: (state, personId) => ({
    ...state,
    status: 'editPerson',
    currentPersonId: personId || state.currentPersonId,
  }),
  [savePerson.request]: (state, payload) => ({
    ...state,
    currentPersonId: payload.id,
    status: 'savePerson',
  }),
  [savePerson.ok]: (state, payload) => ({
    ...state,
    status: 'showList',
    currentPersonId: payload.response.id,
    data: updatePersonInArray(state.data, payload.response),
  }),
  [savePerson.error]: (state, payload) => ({
    ...state,
    status: 'errorPerson',
    data: [],
    error: payload.error,
  }),
  [savePerson.reset]: () => (defaultState),
}, defaultState);
