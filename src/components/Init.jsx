import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login as loginAction, checkToken as checkTokenAction } from '../store/user/actions';
import AppTopBar from './common/AppTopBar';
import Login from './common/Login';
import Tabs from './Tabs';
import Loading from './common/Loading';
import Layout from './common/Layout';

class Init extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('user');
    if (token) {
      this.props.checkToken(token);
    }
  }
  render() {
    const { status } = this.props;

    if (status === 'checkLogin') {
      return (
        <Layout>
          <div>
            <AppTopBar title="Spürnasenecke CRM" />
            <Loading />
          </div>
        </Layout>
      );
    } else if (status === 'loggedIn') {
      return (
        <Layout>
          <Tabs />
        </Layout>
      );
    }

    return (
      <Layout>
        <Login handleSubmit={this.props.login} status={status} />
      </Layout>
    );
  }
}

Init.propTypes = {
  status: PropTypes.string.isRequired,
  checkToken: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  status: state.user.status,
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(loginAction(username, password)),
  checkToken: token => dispatch(checkTokenAction(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Init);
