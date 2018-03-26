import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = name => event =>
    this.setState({
      [name]: event.target.value === '-' ? null : event.target.value,
    });

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleSubmit(this.state.username, this.state.password);
  }

  render() {
    const { status } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <Card style={{ marginTop: 100 }}>
          <CardContent>
            <Typography variant="headline" component="h2" style={{ marginBottom: 20 }}>
              Login
            </Typography>
            <TextField
              required
              label="Benutzer"
              value={this.state.username}
              onChange={this.handleChange('username')}
              style={{ width: 300 }}
            />
            <TextField
              required
              type="password"
              label="Passwort"
              value={this.state.password}
              onChange={this.handleChange('password')}
              style={{ width: 300, marginBottom: 30 }}
            />
            { status === 'invalid' &&
              <Typography component="p" style={{ marginBottom: 30 }}>
                Login nicht erfolgreich.
              </Typography>
            }
          </CardContent>
          <CardActions>
            <Button
              variant="raised"
              type="submit"
              style={{ marginLeft: 120, marginBottom: 50 }}
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  }
}

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default Login;
