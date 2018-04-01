import React from 'react';
import { connect } from 'react-redux';

import Grid from '../components/Grid';
import { STEP_GRID } from '../constants';

const App = ({ grid, stepGrid }) => (
  <div>
    <button onClick={stepGrid}>Step</button>
    <Grid grid={grid} />
  </div>
);

const mapStateToProps = state => ({
  grid: state.grid,
  playing: state.playing,
  currentColumn: state.currentColumn,
});

const mapDispatchToProps = dispatch => ({
  stepGrid: () => dispatch({ type: STEP_GRID }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
