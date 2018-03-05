import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import List, { ListItem, ListItemText, ListItemAvatar } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';

import PersonPropTypes from './PropTypes';
import { showPerson as showPersonAction } from '../../store/persons/actions';

class PersonsList extends Component {
  state = {
    order: 'email',
    search: '',
  };

  handleClick = personId => () =>
    this.props.showPerson(personId);

  handleOrder = event =>
    this.setState({ order: event.target.value });

  handleSearch = event =>
    this.setState({ search: event.target.value });

  render() {
    const { status } = this.props;
    let { persons } = this.props;
    persons.sort((a, b) => {
      const v1 = a[this.state.order].toLowerCase();
      const v2 = b[this.state.order].toLowerCase();
      if (v1 < v2) return -1;
      if (v1 > v2) return 1;
      if (a.email.toLowerCase() < b.email.toLowerCase()) return -1;
      if (a.email.toLowerCase() > b.email.toLowerCase()) return 1;
      return 0;
    });
    if (this.state.search) {
      persons = persons.filter(person =>
        person.fullname.toLowerCase().indexOf(this.state.search) !== -1);
    }

    if (status === 'loadList') {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div>
        <div style={{ position: 'absolute', top: 56 }}>
          <Select
            value={this.state.order}
            onChange={this.handleOrder}
            name="Sortierung"
            style={{ width: 100, marginLeft: 20, marginRight: 20 }}
          >
            <MenuItem value="email">E-Mail</MenuItem>
            <MenuItem value="firstname">Vorname</MenuItem>
            <MenuItem value="lastname">Nachname</MenuItem>
          </Select>
          <TextField
            id="search"
            type="search"
            margin="normal"
            value={this.state.search}
            onChange={this.handleSearch}
          />
        </div>

        <List style={{ height: 'calc(100vh - 176px)', overflow: 'auto', marginTop: 60 }}>
          {persons.map(person => (
            <ListItem key={person.id} onClick={this.handleClick(person.id)}>
              <ListItemAvatar>
                <Avatar>{person.comments_count}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={person.name} secondary={person.email} />
            </ListItem>
          ))}
        </List>
      </div>
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
