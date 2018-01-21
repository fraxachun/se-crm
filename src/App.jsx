import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import logo from './logo.svg';
import './App.css';
import configureStore from './store';
import Persons from './components/persons';

const App = (config = {}) => {
  const initialState = {};
  const store = configureStore(initialState, config);
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Persons />
      </div>
    </Provider>
  );
};

export default () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};
