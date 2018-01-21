import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/extensions
import 'typeface-roboto';
import { MuiThemeProvider } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import AppBar from './components/AppBar';
import Tabs from './components/Tabs';

import configureStore from './store';

const App = (config = {}) => {
  const initialState = {};
  const store = configureStore(initialState, config);
  return (
    <Provider store={store}>
      <MuiThemeProvider>
        <Reboot />
        <AppBar />
        <Tabs />
      </MuiThemeProvider>
    </Provider>
  );
};

export default () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};
