import { createReducer } from 'redux-act';
import { login, checkToken } from './actions';

const defaultState = {
  status: 'loggedOut',
  name: null,
};

const reducer = createReducer({
  [login.request]: state => ({
    ...state,
    status: 'checkLogin',
  }),
  [login.ok]: (state, payload) => ({
    ...state,
    status: 'loggedIn',
    name: payload.name,
  }),
  [login.error]: state => ({
    ...state,
    status: 'invalid',
  }),
  [login.reset]: () => (defaultState),
  [checkToken.request]: state => ({
    ...state,
    status: 'checkLogin',
  }),
  [checkToken.ok]: (state, payload) => ({
    ...state,
    status: 'loggedIn',
    name: payload.name,
  }),
  [checkToken.error]: () => (defaultState),
  [checkToken.reset]: () => (defaultState),
}, defaultState);

export default reducer;
