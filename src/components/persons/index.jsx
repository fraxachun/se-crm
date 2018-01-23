import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PersonsList from './Persons';
import { fetchPersons as fetchPersonsAction } from '../../store/persons/actions';

class Persons extends Component {
  componentDidMount() {
    this.props.fetchPersons();
  }
  render() {
    const { status, data } = this.props;
    if (status === 'loading') {
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
  fetchPersons: PropTypes.func.isRequired,
  status: PropTypes.string,
  // eslint-disable-next-line react/no-typos
  data: PersonsList.propTypes.persons,
};
Persons.defaultProps = {
  data: [],
  status: null,
};

const mapStateToProps = state => state.persons;

const mapDispatchToProps = dispatch => ({
  fetchPersons: () => dispatch(fetchPersonsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
