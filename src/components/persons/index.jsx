import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PersonsList from './List';
import ShowPerson from './Show';
import EditPerson from './Edit';
import { fetchPersons as fetchPersonsAction } from '../../store/persons/actions';

class Controller extends Component {
  componentDidMount() {
    this.props.fetchPersons();
  }
  render() {
    const { status } = this.props;
    if (status === 'showPerson') {
      return <ShowPerson />;
    } else if (status === 'editPerson') {
      return <EditPerson />;
    }
    return <PersonsList />;
  }
}

Controller.propTypes = {
  fetchPersons: PropTypes.func.isRequired,
  status: PropTypes.string,
};
Controller.defaultProps = {
  status: null,
};

const mapStateToProps = state => ({
  status: state.persons.status,
});

const mapDispatchToProps = dispatch => ({
  fetchPersons: () => dispatch(fetchPersonsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controller);
