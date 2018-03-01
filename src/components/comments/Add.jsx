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
    this.props.addComment(this.state);
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
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addComment: (values) => { console.log(values); },
});

export default connect(null, mapDispatchToProps)(AddComment);
