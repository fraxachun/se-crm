import React, { Component } from 'react';

import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import PersonIcon from 'material-ui-icons/Person';
import LocationOnIcon from 'material-ui-icons/Domain';

import Persons from './persons';
import Comments from './comments';
import Locations from './locations';

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
        <div style={{ minHeight: 'calc(100vh - 56px)', position: 'relative' }}>
          {value === 0 && <Comments />}
          {value === 1 && <Locations />}
          {value === 2 && <Persons />}
        </div>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
          style={{ position: 'sticky', bottom: 0 }}
        >
          <BottomNavigationAction label="Kommentare" icon={<RestoreIcon />} color="secondary" />
          <BottomNavigationAction label="Kindergärten" icon={<LocationOnIcon />} />
          <BottomNavigationAction label="Personen" icon={<PersonIcon />} />
        </BottomNavigation>
      </div>
    );
  }
}

export default AppTabs;
