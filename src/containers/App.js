import React from 'react';
import { connect } from 'react-redux';

import MusicBox from './MusicBox';

import { PERIOD_MS } from '../../config/main.config';
import Grid from '../components/Grid';
import { STEP_GRID, START_GAME, STOP_GAME, TOGGLE_CELL } from '../constants';

import styled from 'styled-components';

const AppContainer = styled.div`
  width: 50vh;
  margin: auto;
`;

const App = ({ grid, stepGrid, currentColumn, start, stop, toggleCell, playing }) => {
  return (
    <AppContainer>
      <Grid grid={grid} currentColumn={currentColumn} toggleCell={toggleCell} />
      <div className="tc ba">
        <MusicBox />
        <button onClick={start} disabled={playing}>Start</button>
        <button onClick={stop} disabled={!playing}>Stop</button>
      </div>
    </AppContainer>
  );
};

const mapStateToProps = state => ({
  grid: state.grid,
  playing: state.playing,
  currentColumn: state.currentColumn,
  playing: Boolean(state.interval),
});

const mapDispatchToProps = dispatch => ({
  stepGrid: () => dispatch({ type: STEP_GRID }),
  start: () => dispatch({
    type: START_GAME,
    interval: setInterval(() => dispatch({ type: STEP_GRID }), PERIOD_MS),
  }),
  stop: () => dispatch({ type: STOP_GAME }),
  toggleCell: (x, y) => () => dispatch({ type: TOGGLE_CELL, x, y }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
