import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import List, { ListItem, ListItemText } from 'material-ui/List';

import LocationPropTypes from './PropTypes';
import Show from './Show';

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

    if (currentLocation) {
      return <Show location={currentLocation} handleClose={this.handleClose} />;
    }

    if (loading || !locations) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <List>
        {locations.map(location => (
          <ListItem key={location.id}>
            <ListItemText
              primary={location.name}
              secondary={location.email}
              onClick={this.handleClick(location)}
            />
          </ListItem>
        ))}
      </List>
    );
  }
}

LocationsList.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape(LocationPropTypes.propTypes)),
  loading: PropTypes.bool,
};
LocationsList.defaultProps = {
  locations: [],
  loading: true,
};

const mapStateToProps = state => ({
  locations: state.locations.data,
  loading: state.locations.loading,
});

export default connect(mapStateToProps)(LocationsList);
