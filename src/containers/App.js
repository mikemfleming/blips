import React from 'react';
import { connect } from 'react-redux';

import MusicBox from './MusicBox';

import { PERIOD_MS } from '../../config/main.config';
import Grid from '../components/Grid';
import { STEP_GRID, START_GAME, STOP_GAME } from '../constants';

const App = ({ grid, stepGrid, currentColumn, start, stop }) => {
  const notes = currentColumn > -1
    ? grid.map(row => row[currentColumn]).filter(cell => cell.status).map(c => c.note)
    : [];
  return (
    <div>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <Grid grid={grid} currentColumn={currentColumn} />
      <MusicBox notes={notes} />
    </div>
  );
};

const mapStateToProps = state => ({
  grid: state.grid,
  playing: state.playing,
  currentColumn: state.currentColumn,
});

const mapDispatchToProps = dispatch => ({
  stepGrid: () => dispatch({ type: STEP_GRID }),
  start: () => dispatch({
    type: START_GAME,
    interval: setInterval(() => dispatch({ type: STEP_GRID }), PERIOD_MS),
  }),
  stop: () => dispatch({ type: STOP_GAME }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
