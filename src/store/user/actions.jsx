import { createAction } from 'redux-act';
import { createActionAsync } from 'redux-act-async';
import httpClient from '../httpClient';

const authenticate = createAction('authenticate');

const login = createActionAsync(
  'login',
  (user, password) => httpClient
    .post('/logins', { user, password })
    .then((res) => {
      localStorage.setItem('user', res.data.jwt);
      return res.data;
    }),
);

const checkToken = createActionAsync(
  'checkToken',
  token => httpClient
    .post('/logins', { token })
    .then((res) => {
      localStorage.setItem('user', res.data.jwt);
      return res.data;
    }),
);

export {
  login,
  checkToken,
  authenticate,
};
