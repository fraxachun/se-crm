import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/extensions
import 'typeface-roboto';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';

import Tabs from './components/Tabs';

import configureStore from './store';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#cbff65',
      main: '#96d82f',
      dark: '#62a600',
      contrastText: '#FFF',
    },
    secondary: {
      light: '#67daff',
      main: '#03a9f4',
      dark: '#007ac1',
      contrastText: '#FFF',
    },
  },
});

const App = (config = {}) => {
  const initialState = {};
  const store = configureStore(initialState, config);
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Reboot />
        <Tabs />
      </MuiThemeProvider>
    </Provider>
  );
};

export default () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};
