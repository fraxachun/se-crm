import React from 'react';
import PropTypes from 'prop-types';

import List from 'material-ui/List';

import Person from './Person';

const Persons = ({ persons }) => (
  <List style={{ height: 'calc(100vh - 112px)', overflow: 'auto' }}>
    {persons.map(person =>
      <Person key={person.id} person={person} />)
    }
  </List>
);

Persons.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.shape(Person.propTypes)).isRequired,
};

export default Persons;
