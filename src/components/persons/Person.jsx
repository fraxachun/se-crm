import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ListItem, ListItemText } from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Button from 'material-ui/Button';

import EditPerson from './EditPerson';
import PropTypes from './PropTypes';
import { editPerson } from '../../store/persons/actions';

class Person extends Component {
  handleClose = () => {
    this.props.editPerson(null);
  };

  editPerson = () => {
    this.props.editPerson(this.props.person.id);
  };

  render() {
    const { person, status, currentPersonId } = this.props;
    const showDialog = (
      (status === 'editing' || status === 'saving') &&
      currentPersonId === person.id
    );
    let name = '-';
    if (person.firstname || person.lastname) {
      name = `${person.firstname} ${person.lastname}`;
    }
    if (showDialog) {
      return (
        <Dialog
          fullScreen
          open={showDialog}
        >
          <AppBar position="static">
            <Toolbar>
              <IconButton color="contrast" onClick={this.handleClose} aria-label="Schließen">
                <CloseIcon />
              </IconButton>
              <Typography type="title" color="inherit">
                {name}
              </Typography>
              <Button color="contrast" type="submit" form="edit-person-form">
                save
              </Button>
            </Toolbar>
          </AppBar>
          <EditPerson
            person={person}
            afterSave={this.handleClose}
          />
        </Dialog>
      );
    }
    return (
      <ListItem onClick={this.editPerson}>
        <ListItemText primary={name} secondary={person.email} />
      </ListItem>
    );
  }
}

Person.propTypes = PropTypes.proptypes;
Person.defaultProps = PropTypes.defaultProps;

const mapStateToProps = state => ({
  status: state.persons.status,
  currentPersonId: state.persons.currentPersonId,
});

const mapDispatchToProps = dispatch => ({
  editPerson: id => dispatch(editPerson(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Person);
