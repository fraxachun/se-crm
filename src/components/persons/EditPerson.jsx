import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card, { CardHeader, CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import PropTypes from './PropTypes';
import { savePerson } from '../../store/persons/actions';

class EditPerson extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.person;
  }

  handleChange = name => event =>
    this.setState({
      [name]: event.target.value,
    });

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.savePerson(this.state);
  }

  render() {
    const person = this.state;
    let name = '-';
    if (person.firstname || person.lastname) {
      name = `${person.firstname} ${person.lastname}`;
    }
    if (this.props.status === 'saving') {
      return <div>Saving...</div>;
    }
    return (
      <Card>
        <CardHeader title={name} />
        <CardContent>
          <form
            noValidate
            autoComplete="off"
            id="edit-person-form"
            onSubmit={this.handleSubmit}
          >
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
          </form>
        </CardContent>
      </Card>
    );
  }
}

EditPerson.propTypes = PropTypes.propTypes;
EditPerson.defaultProps = PropTypes.defaultProps;

const mapStateToProps = state => ({ status: state.persons.status });

const mapDispatchToProps = dispatch => ({
  savePerson: values => dispatch(savePerson(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPerson);
