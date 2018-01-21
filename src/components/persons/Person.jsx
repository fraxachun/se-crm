import React from 'react';
import PropTypes from 'prop-types';

const Person = ({ person }) => (
  <p>
    {person.firstname} {person.lastname} ({person.email})
  </p>
);

Person.propTypes = {
  person: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
};
Person.defaultProps = {
  person: {
    firstname: '',
    lastname: '',
  },
};

export default Person;
