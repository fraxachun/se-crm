import PropTypes from 'prop-types';

export default {
  propTypes: {
    comment: PropTypes.string.isRequired,
    date: PropTypes.string,
  },
  defaultProps: {
    comment: {
      comment: '',
      date: '',
    },
  },
};
