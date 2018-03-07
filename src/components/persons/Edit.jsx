import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import PropTypes from './PropTypes';
import { savePerson as savePersonAction } from '../../store/persons/actions';

class EditPerson extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.person;
  }

  handleChange = name => event =>
    this.setState({
      [name]: event.target.value,
    });

  handleSubmit = () => {
    this.props.savePerson(this.props.person, this.state);
    this.props.handleClose();
  }

  render() {
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

EditPerson.propTypes = PropTypes.propTypes;
EditPerson.defaultProps = PropTypes.defaultProps;

const mapDispatchToProps = dispatch => ({
  savePerson: (person, values) => dispatch(savePersonAction(person, values)),
});

export default connect(null, mapDispatchToProps)(EditPerson);
