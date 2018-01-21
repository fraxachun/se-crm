import thunk from 'redux-thunk';
import httpClient from './httpClient';

export default function createMiddlewares() {
  const middlewares = [];
  middlewares.push(thunk.withExtraArgument(httpClient));
  return middlewares;
}
