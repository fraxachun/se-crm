import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Card, { CardHeader, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import { InputAdornment } from 'material-ui/Input';
import SearchIcon from 'material-ui-icons/Search';
import SwapVertIcon from 'material-ui-icons/SwapVert';

import EditPerson from './Edit';
import ShowPerson from './Show';
import PersonPropTypes from './PropTypes';
import getPersonName from '../util';
import AddButton from '../common/AddButton';
import Loading from '../common/Loading';
import FullScreenDialog from '../common/FullScreenDialog';

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
      return <Loading />;
    }

    return (
      <div>
        {addPerson &&
          <FullScreenDialog title="Person Hinzufügen" handleClose={this.handleClose} color="primary">
            <EditPerson handleClose={this.handleClose} />
          </FullScreenDialog>
        }
        {editPerson &&
          <FullScreenDialog title={editPerson.name} handleClose={this.handleClose} color="primary">
            <EditPerson person={editPerson} handleClose={this.handleClose} />
          </FullScreenDialog>
        }
        {showPerson &&
          <FullScreenDialog title="Details" handleClose={this.handleClose}>
            <ShowPerson person={showPerson} handleClose={this.handleClose} />
          </FullScreenDialog>
        }
        <div style={{
            position: 'sticky', top: 64, background: 'white', zIndex: 1200,
          }}
        >
          <Card>
            <Select
              value={order}
              onChange={this.handleOrder}
              name="Sortierung"
              style={{ width: 140, marginLeft: 20, marginRight: 20 }}
              startAdornment={<InputAdornment position="start"><SwapVertIcon /></InputAdornment>}
            >
              <MenuItem value="email">E-Mail</MenuItem>
              <MenuItem value="firstname">Vorname</MenuItem>
              <MenuItem value="lastname">Nachname</MenuItem>
            </Select>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"><SearchIcon /></InputAdornment>
                ),
              }}
              id="search"
              type="search"
              margin="normal"
              value={search}
              onChange={this.handleSearch}
              style={{ width: 170 }}
            />
          </Card>
        </div>

        <div>
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
                  color="secondary"
                  onClick={this.handleShow(person)}
                >
                  Kommentare
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
        <AddButton bottom="75px" onClick={this.handleAdd} />
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
