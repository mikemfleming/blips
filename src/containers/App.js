import React from 'react';
import { connect } from 'react-redux';

import MusicBox from './MusicBox';

import { Box } from '../styles';

import Header from '../components/Header';
import Grid from './Grid';
import { TOGGLE_CELL, TOGGLE_CREATE_MODE, EXIT_CREATE_MODE } from '../constants';

const App = ({
  grid, currentColumn, start, stop, toggleCell, playing, toggleCreateMode, createMode, exitCreateMode,
}) => (
  <div>
    <Header url="/about" />
    <Grid
      exitCreateMode={exitCreateMode}
      grid={grid}
      currentColumn={currentColumn}
      toggleCell={toggleCell}
      playing={playing}
      toggleCreateMode={toggleCreateMode}
      createMode={createMode}
    />
    <MusicBox />
  </div>
);

const mapStateToProps = state => ({
  grid: state.grid,
  currentColumn: state.currentColumn,
  playing: Boolean(state.interval),
  createMode: state.createMode,
});

const mapDispatchToProps = dispatch => ({
  toggleCell: (x, y) => () => dispatch({ type: TOGGLE_CELL, x, y }),
  toggleCreateMode: () => dispatch({ type: TOGGLE_CREATE_MODE }),
  exitCreateMode: () => dispatch({ type: EXIT_CREATE_MODE }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
