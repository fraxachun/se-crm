import React from 'react';

import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

import Layout from './Layout';


const AddButton = ({ color = 'primary', onClick }) => (
  <div style={{
     position: 'fixed', bottom: 0, left: 0, width: '100vw',
   }}
  >
    <Layout>
      <div style={{ position: 'relative' }}>
        <Button
          variant="fab"
          color={color}
          style={{
            position: 'absolute',
            bottom: '75px',
            right: 45,
          }}
          onClick={onClick}
        >
          <AddIcon />
        </Button>
      </div>
    </Layout>
  </div>
);

export default AddButton;
