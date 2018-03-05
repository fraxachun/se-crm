import React from 'react';

import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Typography from 'material-ui/Typography';

import PropTypes from './PropTypes';
import Comments from '../comments/List';

const ShowLocation = ({ location, handleClose }) => (
  <Dialog fullScreen open>
    <AppBar position="static" color="secondary">
      <Toolbar>
        <Typography variant="title" color="inherit">
          {location.name}
        </Typography>
        <IconButton
          color="inherit"
          onClick={handleClose}
          aria-label="Schließen"
          style={{ marginLeft: 'auto' }}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    <Comments location={location} />
  </Dialog>
);

ShowLocation.propTypes = PropTypes.propTypes;

export default ShowLocation;
