import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';

const Persons = ({ persons }) => (
  <div>
    {persons.map(person =>
      <Person key={person.id} person={person} />)
    }
  </div>
);

Persons.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.shape(Person.propTypes)).isRequired,
};

export default Persons;
