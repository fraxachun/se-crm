import React from 'react';
import { connect } from 'react-redux';

import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import ModeEdit from 'material-ui-icons/ModeEdit';
import Delete from 'material-ui-icons/Delete';

import PropTypes from './PropTypes';
import { editPerson as editPersonAction, showList as showListAction } from '../../store/persons/actions';

const EditPerson = ({ person, showList, editPerson }) => (
  <Dialog fullScreen open>
    <AppBar position="static">
      <Toolbar>
        <IconButton color="contrast" onClick={showList} aria-label="Schließen">
          <CloseIcon />
        </IconButton>
        <IconButton color="contrast" onClick={editPerson} aria-label="Bearbeiten">
          <ModeEdit />
        </IconButton>
        <IconButton color="contrast" aria-label="Löschen">
          <Delete />
        </IconButton>
      </Toolbar>
    </AppBar>
    <Card>
      <CardHeader title={person.name} />
      <CardContent>
        {person.email}
      </CardContent>
    </Card>
  </Dialog>
);

EditPerson.propTypes = PropTypes.propTypes;
EditPerson.defaultProps = PropTypes.defaultProps;

const mapStateToProps = state => ({
  person: state.persons.data.find(person => state.persons.currentPersonId === person.id),
});

const mapDispatchToProps = dispatch => ({
  editPerson: () => dispatch(editPersonAction()),
  showList: () => dispatch(showListAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPerson);
