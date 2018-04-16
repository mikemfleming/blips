import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MusicBox from './MusicBox';

import { PERIOD_MS } from '../../config/main.config';
import Grid from '../components/Grid';
import { STEP_GRID, START_GAME, STOP_GAME, TOGGLE_CELL, TOGGLE_CREATE_MODE, EXIT_CREATE_MODE } from '../constants';

const App = ({ grid, currentColumn, start, stop, toggleCell, playing, toggleCreateMode, createMode, exitCreateMode }) => {
  return (
    <div>
      <Link to="/about" className="link dim black"><h1 className="mb2">Blips of Life</h1></Link>
      <Grid exitCreateMode={exitCreateMode} grid={grid} currentColumn={currentColumn} toggleCell={toggleCell} playing={playing} toggleCreateMode={toggleCreateMode} createMode={createMode} />
      <MusicBox />
    </div>
  );
};

const mapStateToProps = state => ({
  grid: state.grid,
  playing: state.playing,
  currentColumn: state.currentColumn,
  playing: Boolean(state.interval),
  createMode: state.createMode,
});

const mapDispatchToProps = dispatch => ({
  stepGrid: () => dispatch({ type: STEP_GRID }),
  toggleCell: (x, y) => () => dispatch({ type: TOGGLE_CELL, x, y }),
  toggleCreateMode: () => dispatch({ type: TOGGLE_CREATE_MODE }),
  exitCreateMode: () => dispatch({ type: EXIT_CREATE_MODE }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
