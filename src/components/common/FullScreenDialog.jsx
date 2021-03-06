import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Typography from 'material-ui/Typography';

import Layout from './Layout';

const FullScreenDialog = ({
  title, handleClose, children, color,
}) => (
  <Dialog fullScreen open>
    <div style={{ height: '100vh' }}>
      <Layout style={{ height: '100vh' }}>
        <div style={{ position: 'relative', height: '100vh' }}>
          <AppBar position="sticky" color={color}>
            <Toolbar>
              <Typography variant="title" color="inherit">
                {title}
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
          {children}
        </div>
      </Layout>
    </div>
  </Dialog>
);

FullScreenDialog.propTypes = {
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  color: PropTypes.string,
};
FullScreenDialog.defaultProps = {
  color: 'secondary',
};

export default FullScreenDialog;
