import PropTypes from 'prop-types';

export default {
  propTypes: {
    location: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
  },
};
