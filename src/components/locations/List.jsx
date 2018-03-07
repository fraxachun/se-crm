import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Card, { CardHeader, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';

import LocationPropTypes from './PropTypes';
import ShowLocation from './Show';
import Loading from '../common/Loading';

class LocationsList extends Component {
  state = {
    currentLocation: null,
  };

  handleClick = location => () =>
    this.setState({
      currentLocation: location,
    });

  handleClose = () =>
    this.setState({
      currentLocation: null,
    });

  render() {
    const { locations, loading } = this.props;
    const { currentLocation } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <div>
        {currentLocation &&
          <ShowLocation location={currentLocation} handleClose={this.handleClose} />
        }
        {locations.map(location => (
          <Card key={location.id}>
            <CardHeader
              avatar={<Avatar>{location.comments_count}</Avatar>}
              title={location.name}
              subheader={location.email}
            />
            <CardActions>
              <Button
                size="small"
                color="primary"
                style={{ marginLeft: 'auto' }}
                onClick={this.handleClick(location)}
              >
                Kommentare
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    );
  }
}

LocationsList.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape(LocationPropTypes.propTypes)).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  locations: state.locations.data,
  loading: state.locations.loading,
});

export default connect(mapStateToProps)(LocationsList);
