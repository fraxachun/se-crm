import React from 'react';
import PropTypes from 'prop-types';

import { CircularProgress } from 'material-ui/Progress';

const Loading = ({ color }) => (
  <div style={{ textAlign: 'center', marginTop: 200 }}>
    <CircularProgress
      size={60}
      thickness={4}
      color={color}
    />
  </div>
);

Loading.propTypes = {
  color: PropTypes.string,
};
Loading.defaultProps = {
  color: 'primary',
};

export default Loading;
