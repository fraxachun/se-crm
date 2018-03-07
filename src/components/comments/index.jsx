import React from 'react';

import CommentsList from './List';
import AppTopBar from '../common/AppTopBar';

const Controller = () => (
  <div>
    <AppTopBar title="Kommentare" color="secondary" />
    <CommentsList />
  </div>
);

export default Controller;
