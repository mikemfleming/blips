import React from 'react';
import { connect } from 'react-redux';

import Grid from '../components/Grid';
import { STEP_GRID } from '../constants';

const App = ({ grid, stepGrid }) => {
  console.table(grid);
  return (
    <div>
      <button onClick={stepGrid} ></button>
      <Grid grid={grid} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    grid: state.grid,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    stepGrid: () => dispatch({ type: STEP_GRID }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
