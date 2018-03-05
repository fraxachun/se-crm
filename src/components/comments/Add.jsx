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
import { addComment as addCommentAction } from '../../store/comments/actions';
import PersonPropTypes from '../persons/PropTypes';

class AddComment extends Component {
  state = {
    comment: '',
  };

  handleChange = name => event =>
    this.setState({
      [name]: event.target.value,
    });

  handleSubmit = (event) => {
    event.preventDefault();
    const values = {
      comment: this.state.comment,
    };
    if (this.props.person) {
      values.person_id = this.props.person.id;
    }
    this.props.addComment(values);
    this.props.handleClose();
  };

  render() {
    return (
      <Dialog open={this.props.open}>
        <DialogTitle>Kommentar hinzufügen</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            label="Text"
            value={this.state.comment}
            onChange={this.handleChange('comment')}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Abbrechen
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Speichern
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AddComment.propTypes = {
  person: PropTypes.shape(PersonPropTypes.propTypes),
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
};
AddComment.defaultProps = {
  person: null,
};

const mapDispatchToProps = dispatch => ({
  addComment: (values) => { dispatch(addCommentAction(values)); },
});

export default connect(null, mapDispatchToProps)(AddComment);
