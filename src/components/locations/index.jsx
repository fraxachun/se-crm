import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LocationsList from './List';
import { fetchLocations as fetchLocationsAction } from '../../store/locations/actions';

class Controller extends Component {
  componentDidMount() {
    this.props.fetchLocations();
  }
  render() {
    return (
      <LocationsList />
    );
  }
}

Controller.propTypes = {
  fetchLocations: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchLocations: () => dispatch(fetchLocationsAction()),
});

export default connect(null, mapDispatchToProps)(Controller);
