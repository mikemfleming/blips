import React from 'react';
import { connect } from 'react-redux';

import MusicBox from './MusicBox';

import { PERIOD_MS } from '../../config/main.config';
import Grid from '../components/Grid';
import { STEP_GRID, START_GAME, STOP_GAME, TOGGLE_CELL } from '../constants';

const App = ({ grid, stepGrid, currentColumn, start, stop, toggleCell, playing }) => {
  const notes = currentColumn > -1
    ? grid.map(row => row[currentColumn]).filter(cell => cell.status).map(c => c.note)
    : [];
  return (
    <div>
      <button onClick={start} disabled={playing}>Start</button>
      <button onClick={stop} disabled={!playing}>Stop</button>
      <Grid grid={grid} currentColumn={currentColumn} toggleCell={toggleCell} />
      <MusicBox notes={notes} />
    </div>
  );
};

const mapStateToProps = ({ game }) => ({
  grid: game.grid,
  playing: game.playing,
  currentColumn: game.currentColumn,
  playing: Boolean(game.interval),
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
