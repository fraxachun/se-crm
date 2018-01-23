import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/extensions
import 'typeface-roboto';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import AppBar from './components/AppBar';
import Tabs from './components/Tabs';

import configureStore from './store';

const theme = createMuiTheme();

const App = (config = {}) => {
  const initialState = {};
  const store = configureStore(initialState, config);
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
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
