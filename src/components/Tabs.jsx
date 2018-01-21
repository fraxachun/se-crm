import React, { Component } from 'react';

import Tabs, { Tab } from 'material-ui/Tabs';

import Persons from './persons';

class AppTabs extends Component {
  state = {
    value: 1,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        <Tabs
          value={value}
          onChange={this.handleChange}
          fullWidth
        >
          <Tab label="Ereignisse" />
          <Tab label="Personen" />
          <Tab label="Kindergärten" />
        </Tabs>
        {value === 0 && <div>todo</div>}
        {value === 1 && <Persons />}
        {value === 2 && <div>todo</div>}
      </div>
    );
  }
}

export default AppTabs;
