import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Card, {
  CardActions,
  CardContent,
} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import LocationPropTypes from './PropTypes';
import { saveLocation as saveLocationAction } from '../../store/locations/actions';

class EditLocation extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.location;
  }

  handleChange = name => event =>
    this.setState({
      [name]: event.target.value === '-' ? null : event.target.value,
    });

  handleSubmit = () => {
    this.props.saveLocation(this.props.location, this.state);
    this.props.handleClose();
  }

  render() {
    return (
      <Card>
        <CardContent>
          <TextField
            required
            label="Bezeichnung"
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
            style={{ width: 300 }}
          />
          <TextField
            required
            label="Sponsor"
            value={this.state.sponsor}
            onChange={this.handleChange('sponsor')}
            margin="normal"
            style={{ width: 300 }}
          />
          <TextField
            required
            multiline
            rows="2"
            label="Adresse"
            value={this.state.address}
            onChange={this.handleChange('address')}
            margin="normal"
            style={{ width: 300 }}
          />
          <TextField
            required
            label="Telefon"
            value={this.state.telephone}
            onChange={this.handleChange('telephone')}
            margin="normal"
            style={{ width: 300 }}
          />
          <TextField
            required
            label="E-Mail"
            value={this.state.email}
            onChange={this.handleChange('email')}
            margin="normal"
            style={{ width: 300 }}
          />
          <TextField
            required
            multiline
            rows="8"
            label="Info"
            value={this.state.facts}
            onChange={this.handleChange('facts')}
            margin="normal"
            style={{ width: 300 }}
          />
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

EditLocation.propTypes = {
  location: LocationPropTypes.propTypes.location.isRequired, // eslint-disable-line react/no-typos
  saveLocation: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  saveLocation: (location, values) => dispatch(saveLocationAction(location, values)),
});

export default connect(null, mapDispatchToProps)(EditLocation);
