import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import List, { ListItem, ListItemText } from 'material-ui/List';

import PersonPropTypes from './PropTypes';
import { showPerson as showPersonAction } from '../../store/persons/actions';

class PersonsList extends Component {
  handleClick = personId => () =>
    this.props.showPerson(personId);

  render() {
    const { persons, status } = this.props;

    if (status === 'loadList') {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <List style={{ height: 'calc(100vh - 112px)', overflow: 'auto' }}>
        {persons.map(person => (
          <ListItem key={person.id} onClick={this.handleClick(person.id)}>
            <ListItemText primary={person.name} secondary={person.email} />
          </ListItem>
        ))}
      </List>
    );
  }
}

PersonsList.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.shape(PersonPropTypes.propTypes)).isRequired,
  status: PropTypes.string.isRequired,
  showPerson: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  persons: state.persons.data,
  status: state.persons.status,
});

const mapDispatchToProps = dispatch => ({
  showPerson: personId => dispatch(showPersonAction(personId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonsList);
