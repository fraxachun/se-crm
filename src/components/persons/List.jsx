import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Card, { CardHeader, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';

import AddPerson from './Add';
import EditPerson from './Edit';
import ShowPerson from './Show';
import PersonPropTypes from './PropTypes';
import getPersonName from '../util';
import AddButton from '../common/AddButton';

class PersonsList extends Component {
  state = {
    order: 'email',
    search: '',
    editPerson: null,
    showPerson: null,
    addPerson: false,
  };

  handleEdit = person => () =>
    this.setState({ editPerson: person });

  handleShow = person => () =>
    this.setState({ showPerson: person });

  handleAdd = () =>
    this.setState({ addPerson: true });

  handleClose = () =>
    this.setState({
      editPerson: null,
      showPerson: null,
      addPerson: false,
    });

  handleOrder = event =>
    this.setState({ order: event.target.value });

  handleSearch = event =>
    this.setState({ search: event.target.value });

  render() {
    const { loading } = this.props;
    let { persons } = this.props;
    const {
      order, search, editPerson, showPerson, addPerson,
    } = this.state;

    persons.sort((a, b) => {
      const v1 = a[order].toLowerCase();
      const v2 = b[order].toLowerCase();
      if (v1 < v2) return -1;
      if (v1 > v2) return 1;
      if (a.email.toLowerCase() < b.email.toLowerCase()) return -1;
      if (a.email.toLowerCase() > b.email.toLowerCase()) return 1;
      return 0;
    });
    if (search) {
      persons = persons.filter(person =>
        person.fullname.toLowerCase().indexOf(search) !== -1);
    }

    if (loading) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div>
        {addPerson &&
          <AddPerson handleClose={this.handleClose} />
        }
        {editPerson &&
          <EditPerson person={editPerson} handleClose={this.handleClose} />
        }
        {showPerson &&
          <ShowPerson person={showPerson} handleClose={this.handleClose} />
        }
        <div style={{ position: 'absolute', top: 56 }}>
          <Select
            value={order}
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
            value={search}
            onChange={this.handleSearch}
          />
        </div>

        <div style={{ height: 'calc(100vh - 176px)', overflow: 'auto', marginTop: 60 }}>
          {persons.map(person => (
            <Card key={person.id}>
              <CardHeader
                avatar={<Avatar>{person.comments_count}</Avatar>}
                title={getPersonName(person.name, person.location_name)}
                subheader={person.email}
              />
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  style={{ marginLeft: 'auto' }}
                  onClick={this.handleEdit(person)}
                >
                  Bearbeiten
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={this.handleShow(person)}
                >
                  Kommentare
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
        <AddButton color="primary" onClick={this.handleAdd} />
      </div>
    );
  }
}

PersonsList.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.shape(PersonPropTypes.propTypes)).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  persons: state.persons.persons.data,
  loading: state.persons.persons.loading,
});

export default connect(mapStateToProps)(PersonsList);
