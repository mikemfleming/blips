import React from 'react';
import { connect } from 'react-redux';

import Synth from './Synth';
import Grid from '../components/Grid';
import { STEP_GRID, PLAY, NEXT_COLUMN, START_OVER, START } from '../constants';

const App = ({
  grid, stepGrid, playing, play, currentColumn, nextColumn, start,
}) => (
  <div>
    <button onClick={stepGrid}>Step</button>
    <button onClick={start}>Start</button>
    <Synth
      grid={grid}
      currentColumn={currentColumn}
      nextColumn={nextColumn}
    />
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
  play: () => dispatch({ type: PLAY }),
  nextColumn: () => dispatch({ type: NEXT_COLUMN }),
  startOver: () => dispatch({ type: START_OVER }),
  start: () => dispatch({ type: START }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
