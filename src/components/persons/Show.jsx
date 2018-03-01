import React from 'react';
import { connect } from 'react-redux';

import Card, { CardActions, CardContent } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import EditIcon from 'material-ui-icons/ModeEdit';
import DeleteIcon from 'material-ui-icons/Delete';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import PropTypes from './PropTypes';
import { editPerson as editPersonAction, showList as showListAction } from '../../store/persons/actions';
import Comments from '../comments/List';

const EditPerson = ({ person, showList, editPerson }) => (
  <Dialog fullScreen open>
    <AppBar position="static" color="secondary">
      <Toolbar>
        <Typography variant="title" color="inherit">
          {person.name}
        </Typography>
        <IconButton color="inherit" onClick={showList} aria-label="Schließen" style={{ marginLeft: 'auto' }}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    <Card>
      <CardContent>
        {person.email}
      </CardContent>
      <CardActions style={{ justifyContent: 'flex-end' }}>
        <Button size="small" color="secondary" onClick={editPerson} >
          <EditIcon />
          Bearbeiten
        </Button>
        <Button size="small" color="secondary">
          <DeleteIcon />
          Löschen
        </Button>
      </CardActions>
    </Card>
    <Comments personId={person.id} />
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
