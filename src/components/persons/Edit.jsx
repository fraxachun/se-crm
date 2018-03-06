import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import PropTypes from './PropTypes';
import { savePerson as savePersonAction } from '../../store/persons/actions';
import Dialog from '../Dialog';

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
    const { person, handleClose } = this.props;

    return (
      <Dialog title={person.name} handleClose={handleClose}>
        <Card>
          <CardHeader title={person.name} />
          <CardContent>
            <TextField
              id="firstname"
              label="Vorname"
              value={this.state.firstname}
              onChange={this.handleChange('firstname')}
              margin="normal"
            />
            <TextField
              id="lastname"
              label="Nachname"
              value={this.state.lastname}
              onChange={this.handleChange('lastname')}
              margin="normal"
            />
            <TextField
              id="email"
              label="E-Mail"
              value={this.state.email}
              onChange={this.handleChange('email')}
              margin="normal"
            />
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="secondary"
              style={{ marginLeft: 'auto' }}
              onClick={this.handleSubmit}
            >
              Speichern
            </Button>
          </CardActions>

        </Card>
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
