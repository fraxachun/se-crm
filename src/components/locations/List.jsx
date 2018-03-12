import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Card, { CardHeader, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';

import LocationPropTypes from './PropTypes';
import EditLocation from './Edit';
import Loading from '../common/Loading';
import Comments from '../comments/List';
import FullScreenDialog from '../common/FullScreenDialog';

class LocationsList extends Component {
  state = {
    currentLocation: null,
    currentEditLocation: null,
  };

  handleInfoClick = location => () =>
    this.setState({
      currentEditLocation: location,
    });

  handleClick = location => () =>
    this.setState({
      currentLocation: location,
    });

  handleClose = () =>
    this.setState({
      currentLocation: null,
      currentEditLocation: null,
    });

  render() {
    const { locations, loading } = this.props;
    const { currentLocation, currentEditLocation } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <div>
        {currentLocation &&
          <FullScreenDialog title={currentLocation.name} handleClose={this.handleClose}>
            <Comments location={currentLocation} />
          </FullScreenDialog>
        }
        {currentEditLocation &&
          <FullScreenDialog title={currentEditLocation.name} handleClose={this.handleClose} color="primary">
            <EditLocation location={currentEditLocation} handleClose={this.handleClose} />
          </FullScreenDialog>
        }
        {locations.map(location => (
          <Card key={location.id}>
            <CardHeader
              avatar={<Avatar>{location.comments_count}</Avatar>}
              title={location.name}
              subheader={location.sponsor}
            />
            <CardActions>
              <Button
                size="small"
                color="primary"
                style={{ marginLeft: 'auto' }}
                onClick={this.handleInfoClick(location)}
              >
                Info
              </Button>
              <Button
                size="small"
                color="primary"
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
  locations: state.locations.locations.data,
  loading: state.locations.locations.loading,
});

export default connect(mapStateToProps)(LocationsList);
