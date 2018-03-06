import React from 'react';

import PropTypes from './PropTypes';
import Comments from '../comments/List';
import Dialog from '../Dialog';

const ShowPerson = ({ person, handleClose }) => (
  <Dialog title={person.name} handleClose={handleClose}>
    <Comments person={person} />
  </Dialog>
);

ShowPerson.propTypes = PropTypes.propTypes;

export default ShowPerson;
