import React from 'react';
import PropTypes from 'prop-types';

import { ListItem, ListItemText } from 'material-ui/List';

const Person = ({ person }) => {
  let name = '-';
  if (person.firstname || person.lastname) {
    name = `${person.firstname} ${person.lastname}`;
  }
  return (
    <ListItem>
      <ListItemText primary={name} secondary={person.email} />
    </ListItem>
  );
};

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
