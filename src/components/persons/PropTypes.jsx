import PropTypes from 'prop-types';

export default {
  propTypes: {
    person: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      email: PropTypes.string.isRequired,
    }),
  },
  defaultProps: {
    person: {
      firstname: '',
      lastname: '',
    },
  },
};
