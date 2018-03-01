import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

import fetchCommentsAction from '../../store/comments/actions';
import CommentPropTypes from './PropTypes';
import AddComment from './Add';

const Comment = ({
  comment: {
    date, comment, user_name: user, location_name: location, person_name: person,
  },
}) => {
  let title = '';
  if (person) title = person;
  if (location) {
    if (title) {
      title += ` (${location})`;
    } else {
      title = location;
    }
  }
  const words = user.split(' ');
  const avatar = words[0].substr(0, 1) + words[1].substr(0, 1);
  let color = null;
  switch (avatar) {
    case 'FU': color = '#795548'; break;
    case 'BU': color = '#2196F3'; break;
    case 'KS': color = '#4CAF50'; break;
    case 'CN': color = '#F44336'; break;
    case 'GS': color = '#FF9800'; break;
    default: color = '#607D8B'; break;
  }
  const style = { backgroundColor: color };
  const text = comment.split('\n').map((line, key) =>
    <span key={key}>{line}<br /></span>); // eslint-disable-line react/no-array-index-key
  return (
    <Card>
      <CardHeader
        avatar={<Avatar style={style}>{avatar}</Avatar>}
        action={<IconButton><MoreVertIcon /></IconButton>}
        title={title}
        subheader={date}
      />
      <CardContent>
        <Typography>{ text }</Typography>
      </CardContent>
    </Card>
  );
};
Comment.propTypes = {
  comment: PropTypes.shape(CommentPropTypes.propTypes).isRequired,
};

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
    };
  }
  componentDidMount() {
    this.props.fetchComments({ personId: this.props.personId });
  }
  handleClick = (event) => {
    event.preventDefault();
    this.setState({
      showDialog: true,
    });
  }
  hideDialog = () => {
    this.setState({
      showDialog: false,
    });
  }

  render() {
    const { loading, comments } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    }
    const style = {
      position: 'fixed',
      top: 'auto',
      left: 'auto',
      right: 25,
      bottom: 85,
    };
    return (
      <div>
        <AddComment open={this.state.showDialog} handleClose={this.hideDialog} />
        {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
        <Button variant="fab" color="secondary" style={style} onClick={this.handleClick}>
          <AddIcon />
        </Button>
      </div>
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
