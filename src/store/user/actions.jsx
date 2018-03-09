import { createAction } from 'redux-act';
import { createActionAsync } from 'redux-act-async';

import httpClient from '../httpClient';

const authenticate = createAction('authenticate');

const login = createActionAsync(
  'login',
  (user, password) => httpClient
    .post('/login', { user, password })
    .then((res) => {
      httpClient.defaults.headers['X-JWT'] = res.data.jwt;
      localStorage.setItem('user', res.data.jwt);
      return res.data;
    }),
);

const checkToken = createActionAsync(
  'checkToken',
  token => httpClient
    .post('/login', { token })
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
