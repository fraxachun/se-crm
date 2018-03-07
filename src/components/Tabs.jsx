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
        <div style={{ height: 'calc(100vh - 104px)', overflow: 'auto', marginTop: 56 }}>
          {value === 0 && <Comments />}
          {value === 1 && <Persons />}
          {value === 2 && <Locations />}
        </div>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
          style={{ position: 'fixed', bottom: 0, width: '100%' }}
        >
          <BottomNavigationAction label="Kommentare" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Personen" icon={<PersonIcon />} />
          <BottomNavigationAction label="Kindergärten" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </div>
    );
  }
}

export default AppTabs;
