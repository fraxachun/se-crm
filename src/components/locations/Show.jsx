import React from 'react';

import PropTypes from './PropTypes';
import Comments from '../comments/List';
import FullScreenDialog from '../common/FullScreenDialog';

const ShowLocation = ({ location, handleClose }) => (
  <FullScreenDialog title={location.name} handleClose={handleClose}>
    <Comments location={location} />
  </FullScreenDialog>
);

ShowLocation.propTypes = PropTypes.propTypes;

export default ShowLocation;
