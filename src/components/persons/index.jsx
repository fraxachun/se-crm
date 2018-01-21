import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PersonsList from './Persons';
import fetchPersons from '../../store/persons/actions';

class Persons extends Component {
  componentDidMount() {
    const { loadPersons } = this.props;
    loadPersons();
  }
  render() {
    const { loading, data } = this.props;
    if (loading) {
      return (
        <div>Loading...</div>
      );
    }
    return (
      <PersonsList persons={data} />
    );
  }
}

Persons.propTypes = {
  loadPersons: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/no-typos
  data: PersonsList.propTypes.persons,
};
Persons.defaultProps = {
  data: [],
};

const mapStateToProps = state => state.persons;

const mapDispatchToProps = dispatch => ({
  loadPersons: () => dispatch(fetchPersons()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
