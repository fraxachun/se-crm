import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { MenuItem } from 'material-ui/Menu';

import PropTypes from './PropTypes';
import { savePerson as savePersonAction } from '../../store/persons/actions';
import fetchLocationsAction from '../../store/locations/actions';

class EditPerson extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.person;
    if (this.props.locations.length === 0) {
      this.props.fetchLocations();
    }
  }

  handleChange = name => event =>
    this.setState({
      [name]: event.target.value === '-' ? null : event.target.value,
    });

  handleSubmit = () => {
    this.props.savePerson(this.props.person, this.state);
    this.props.handleClose();
  }

  render() {
    const { locations } = this.props;
    locations.sort((a, b) => {
      const v1 = a.name.toLowerCase();
      const v2 = b.name.toLowerCase();
      if (v1 < v2) return -1;
      if (v1 > v2) return 1;
      return 0;
    });


    return (
      <Dialog open>
        <DialogTitle>Bearbeiten</DialogTitle>
        <DialogContent>
          <TextField
            required
            id="firstname"
            label="Vorname"
            value={this.state.firstname}
            onChange={this.handleChange('firstname')}
            margin="normal"
            style={{ width: 300 }}
          />
          <TextField
            required
            id="lastname"
            label="Nachname"
            value={this.state.lastname}
            onChange={this.handleChange('lastname')}
            margin="normal"
            style={{ width: 300 }}
          />
          <TextField
            required
            id="email"
            label="E-Mail"
            value={this.state.email}
            onChange={this.handleChange('email')}
            margin="normal"
            style={{ width: 300 }}
          />

          <TextField
            required
            select
            id="kindergarten"
            label="Kindergarten"
            value={this.state.location_id ? this.state.location_id : '-'}
            onChange={this.handleChange('location_id')}
            margin="normal"
            style={{ width: 300 }}
          >
            <MenuItem value="-">
              -
            </MenuItem>
            {locations.map(location => (
              <MenuItem key={location.id} value={location.id}>
                {location.name}
              </MenuItem>
            ))}
          </TextField>

        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose}>
            Abbrechen
          </Button>
          <Button onClick={this.handleSubmit}>
            Speichern
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

EditPerson.propTypes = PropTypes.propTypes;
EditPerson.defaultProps = PropTypes.defaultProps;

const mapStateToProps = state => ({
  locations: state.locations.data,
});

const mapDispatchToProps = dispatch => ({
  savePerson: (person, values) => dispatch(savePersonAction(person, values)),
  fetchLocations: () => dispatch(fetchLocationsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPerson);
