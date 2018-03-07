import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PersonsList from './List';
import { fetchPersons as fetchPersonsAction } from '../../store/persons/actions';
import AppTopBar from '../common/AppTopBar';

class Controller extends Component {
  componentDidMount() {
    this.props.fetchPersons();
  }
  render() {
    return (
      <div>
        <AppTopBar title="Personen" />
        <PersonsList />
      </div>
    );
  }
}

Controller.propTypes = {
  fetchPersons: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchPersons: () => dispatch(fetchPersonsAction()),
});

export default connect(null, mapDispatchToProps)(Controller);
