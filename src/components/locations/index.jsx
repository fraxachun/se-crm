import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LocationsList from './List';
import { fetchLocations as fetchLocationsAction } from '../../store/locations/actions';
import AppTopBar from '../common/AppTopBar';

class Controller extends Component {
  componentDidMount() {
    this.props.fetchLocations();
  }
  render() {
    return (
      <div>
        <AppTopBar title="Kindergärten" />
        <LocationsList />
      </div>
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
