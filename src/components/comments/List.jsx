import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';

import { fetchComments as fetchCommentsAction } from '../../store/comments/actions';
import CommentPropTypes from './PropTypes';
import PersonPropTypes from '../persons/PropTypes';
import LocationPropTypes from '../locations/PropTypes';
import AddComment from './Add';
import getPersonName from '../util';
import Loading from '../common/Loading';
import AddButton from '../common/AddButton';

const Comment = ({
  comment: {
    date, comment, user_name: user, location_name: location, person_name: person,
  },
}) => {
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
        title={getPersonName(person, location)}
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
    const params = {};
    if (this.props.person) {
      params.personId = this.props.person.id;
    }
    if (this.props.location) {
      params.locationId = this.props.location.id;
    }
    this.props.fetchComments(params);
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
      return <Loading color="secondary" />;
    }
    return (
      <div>
        {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
        <AddComment
          open={this.state.showDialog}
          handleClose={this.hideDialog}
          person={this.props.person}
          location={this.props.location}
        />
        <AddButton
          color="secondary"
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

Comments.propTypes = {
  person: PropTypes.shape(PersonPropTypes.propTypes),
  location: PropTypes.shape(LocationPropTypes.propTypes),
  comments: PropTypes.arrayOf(PropTypes.shape(CommentPropTypes.propTypes)),
  loading: PropTypes.bool.isRequired,
  fetchComments: PropTypes.func.isRequired,
};
Comments.defaultProps = {
  person: null,
  location: null,
  comments: [],
};

const mapStateToProps = state => ({
  comments: state.comments.comments.data ? state.comments.comments.data : [],
  loading: state.comments.comments.loading,
});

const mapDispatchToProps = dispatch => ({
  fetchComments: params => dispatch(fetchCommentsAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
