import React from 'react';

import Header from './Header';
import MusicBox from '../containers/MusicBox';
import Grid from '../containers/Grid';
import { Box } from '../styles';

const App = () => (
  <div>
    <Header url="/about" />
    <Grid />
    <MusicBox />
  </div>
);

export default App;
