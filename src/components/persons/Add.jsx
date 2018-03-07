import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import { addPerson as addPersonAction } from '../../store/persons/actions';

class AddPerson extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
  }
  handleChange = name => event =>
    this.setState({
      [name]: event.target.value,
    });

  handleSubmit = () => {
    this.props.addPerson(this.state);
    this.props.handleClose();
  }

  render() {
    return (
      <Dialog open>
        <DialogTitle>Hinzufügen</DialogTitle>
        <DialogContent>
          <TextField
            required
            id="firstname"
            label="Vorname"
            value={this.state.firstname}
            onChange={this.handleChange('firstname')}
            margin="normal"
          />
          <TextField
            required
            id="lastname"
            label="Nachname"
            value={this.state.lastname}
            onChange={this.handleChange('lastname')}
            margin="normal"
          />
          <TextField
            required
            id="email"
            label="E-Mail"
            value={this.state.email}
            onChange={this.handleChange('email')}
            margin="normal"
          />
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

AddPerson.propTypes = {
  addPerson: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addPerson: values => dispatch(addPersonAction(values)),
});

export default connect(null, mapDispatchToProps)(AddPerson);
