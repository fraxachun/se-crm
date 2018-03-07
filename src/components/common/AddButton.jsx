import React from 'react';

import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

const style = {
  position: 'fixed',
  top: 'auto',
  left: 'auto',
  right: 25,
  bottom: 85,
};

const AddButton = props => (
  <Button
    variant="fab"
    color="secondary"
    style={style}
    {...props}
  >
    <AddIcon />
  </Button>
);

export default AddButton;
