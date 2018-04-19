import React from 'react';

import Header from './Header';
import Controls from '../containers/Controls';
import Grid from '../containers/Grid';
import { Box } from '../styles';

const App = () => (
  <div>
    <Header url="/about" />
    <Grid />
    <Controls />
  </div>
);

export default App;
