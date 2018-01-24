import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card, { CardHeader, CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Button from 'material-ui/Button';

import PropTypes from './PropTypes';
import { savePerson as savePersonAction, showList as showListAction } from '../../store/persons/actions';

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
    const { status, showList } = this.props;

    if (status === 'savePerson') {
      return <div>Saving...</div>;
    }

    return (
      <Dialog fullScreen open>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="contrast" onClick={showList} aria-label="Schließen">
              <CloseIcon />
            </IconButton>
            <Typography type="title" color="inherit">
              {person.name}
            </Typography>
            <Button color="contrast" type="submit" form="edit-person-form">
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Card>
          <CardHeader title={person.name} />
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
      </Dialog>
    );
  }
}

EditPerson.propTypes = PropTypes.propTypes;
EditPerson.defaultProps = PropTypes.defaultProps;

const mapStateToProps = state => ({
  person: state.persons.data.find(person => state.persons.currentPersonId === person.id),
  status: state.persons.status,
});

const mapDispatchToProps = dispatch => ({
  savePerson: values => dispatch(savePersonAction(values)),
  showList: () => dispatch(showListAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPerson);
