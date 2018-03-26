import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';

const Layout = ({ children }) => (
  <Grid container spacing={0} justify="center">
    <Grid item xs={12} sm={8} md={6} xl={4}>
      { children }
    </Grid>
  </Grid>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
