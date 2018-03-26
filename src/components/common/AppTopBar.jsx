import React from 'react';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const AppTopBar = ({ title, color }) => (
  <AppBar position="sticky" color={color}>
    <Toolbar>
      <Typography variant="title" color="inherit">
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
);

AppTopBar.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
};
AppTopBar.defaultProps = {
  color: 'primary',
};

export default AppTopBar;
