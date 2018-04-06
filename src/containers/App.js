import React from 'react';
import { connect } from 'react-redux';

import MusicBox from './MusicBox';

import { PERIOD_MS } from '../../config/main.config';
import Grid from '../components/Grid';
import { STEP_GRID, START_GAME, STOP_GAME, TOGGLE_CELL } from '../constants';

import styled from 'styled-components';

const AppContainer = styled.div`
  width: 50vh;
  @media screen and (max-width: 30em) {
    width: 100vw;
  }
  margin: auto;
`;

const App = ({ grid, currentColumn, start, stop, toggleCell, playing }) => {
  return (
    <AppContainer>
      <Grid grid={grid} currentColumn={currentColumn} toggleCell={toggleCell} playing={playing} />
      <div className="tc vh-50">
        <MusicBox />
        {
          playing
            ? <button className="h-50 w-100 bg-light-green" onClick={stop}>Stop</button>
            : <button className="h-50 w-100 bg-light-green" onClick={start}>Start</button>
        }
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
