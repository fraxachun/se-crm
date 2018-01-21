import { createStore, applyMiddleware, compose } from 'redux';
import createMiddlewares from './middlewares';
import rootReducer from './rootReducer';

export default (initialState, config) => {
  const middlewares = createMiddlewares(config);
  let enhancer;
  if (process.env.NODE_ENV !== 'production') {
    enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  } else {
    enhancer = compose;
  }
  const store = createStore(
    rootReducer,
    initialState,
    enhancer(applyMiddleware(...middlewares)),
  );
  return store;
};
