import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Card, {
  CardActions,
  CardContent,
} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { MenuItem } from 'material-ui/Menu';

import PersonPropTypes from './PropTypes';
import LocationPropTypes from '../locations/PropTypes';
import { savePerson as savePersonAction, addPerson as addPersonAction } from '../../store/persons/actions';

class EditPerson extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.person;
  }

  handleChange = name => event =>
    this.setState({
      [name]: event.target.value === '-' ? null : event.target.value,
    });

  handleSubmit = () => {
    if (this.props.person.id) {
      this.props.savePerson(this.props.person, this.state);
    } else {
      this.props.addPerson(this.state);
    }
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
      <Card>
        <CardContent>
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
            value={this.state.location_id ? this.state.location_id.toString() : '-'}
            onChange={this.handleChange('location_id')}
            margin="normal"
            style={{ width: 300 }}
          >
            <MenuItem value="-">
              -
            </MenuItem>
            {locations.map(location => (
              <MenuItem key={location.id} value={location.id}>
                {location.name.replace('Kindergarten', 'KG')}
              </MenuItem>
            ))}
          </TextField>

        </CardContent>
        <CardActions>
          <Button onClick={this.props.handleClose} color="primary">
            Abbrechen
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Speichern
          </Button>
        </CardActions>
      </Card>
    );
  }
}

EditPerson.propTypes = {
  person: PersonPropTypes.propTypes.person, // eslint-disable-line react/no-typos
  addPerson: PropTypes.func.isRequired,
  savePerson: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(LocationPropTypes.propTypes.location).isRequired,
};
EditPerson.defaultProps = {
  person: PersonPropTypes.defaultProps.person,
};

const mapStateToProps = state => ({
  locations: state.locations.locations.data,
});

const mapDispatchToProps = dispatch => ({
  addPerson: values => dispatch(addPersonAction(values)),
  savePerson: (person, values) => dispatch(savePersonAction(person, values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPerson);
