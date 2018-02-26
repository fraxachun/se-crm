import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import List, { ListItem, ListItemText } from 'material-ui/List';

import fetchCommentsAction from '../../store/comments/actions';
import CommentPropTypes from './PropTypes';

const Comment = ({ comment }) => {
  let primary = comment.date;
  if (comment.location_name) {
    primary += '<br />';
    primary += comment.location_name;
  }
  if (comment.person_name) {
    primary += '<br />';
    primary += comment.person_name;
  }
  const secondary = comment.comment.split('\n').map((line, key) =>
    <span key={key}>{line}<br /></span>); // eslint-disable-line react/no-array-index-key
  return (
    <ListItem dense>
      <ListItemText
        // eslint-disable-next-line react/no-danger
        primary={<div dangerouslySetInnerHTML={{ __html: primary }} />}
        secondary={<span>{secondary}</span>}
      />
    </ListItem>
  );
};
Comment.propTypes = {
  comment: PropTypes.shape(CommentPropTypes.propTypes).isRequired,
};

class Comments extends Component {
  componentDidMount() {
    this.props.fetchComments({ personId: this.props.personId });
  }
  render() {
    const { loading, comments } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <List style={{ overflow: 'auto' }}>
        {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
      </List>
    );
  }
}

Comments.propTypes = {
  personId: PropTypes.number,
  comments: PropTypes.arrayOf(PropTypes.shape(CommentPropTypes.propTypes)),
  loading: PropTypes.bool.isRequired,
  fetchComments: PropTypes.func.isRequired,
};
Comments.defaultProps = {
  personId: null,
  comments: [],
};

const mapStateToProps = state => ({
  comments: state.comments.data ? state.comments.data : [],
  loading: state.comments.loading,
});

const mapDispatchToProps = dispatch => ({
  fetchComments: params => dispatch(fetchCommentsAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
