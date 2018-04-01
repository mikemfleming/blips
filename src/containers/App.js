import React from 'react';
import { connect } from 'react-redux';

import Grid from '../components/Grid';
import { STEP_GRID, START_GAME, STOP_GAME } from '../constants';

const App = ({ grid, stepGrid, currentColumn, start, stop }) => (
  <div>
    <button onClick={start}>Start</button>
    <button onClick={stop}>Stop</button>
    <Grid grid={grid} currentColumn={currentColumn} />
  </div>
);

const mapStateToProps = state => ({
  grid: state.grid,
  playing: state.playing,
  currentColumn: state.currentColumn,
});

const mapDispatchToProps = dispatch => ({
  stepGrid: () => dispatch({ type: STEP_GRID }),
  start: () => dispatch({
    type: START_GAME,
    interval: setInterval(() => dispatch({ type: STEP_GRID }), 200),
  }),
  stop: () => dispatch({ type: STOP_GAME }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
