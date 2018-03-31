import React from 'react';
import { connect } from 'react-redux';

import Grid from '../components/Grid';
import { STEP_GRID, PLAY, NEXT_COLUMN, START_OVER } from '../constants';

const audioContext = new AudioContext();
const period = .25;

const App = ({
  grid, stepGrid, playing, play, currentColumn, nextColumn, startOver,
}) => {

  const synth = (grid, currentColumn) => {
    const notes = [];
    for (let y = 0; y < grid[0].length; y += 1) {
      if (grid[y][currentColumn]) {
        notes.push(y);
      }
    }
    const oscillators = notes.map((note, idx) => {
      note += 1;
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const convolver = audioContext.createConvolver();
      oscillator.frequency.value = (note * 261.63) * (3/2); // middle c and pentatonic ratio
      gainNode.gain.value = 0.1;
      oscillator.type = 'square';
      oscillator.start();
      if (!idx) oscillator.onended = () => nextColumn();
      oscillator.stop(audioContext.currentTime + period); // stop playing periods from now
      oscillator.connect(gainNode);
      convolver.connect(gainNode);
      gainNode.connect(audioContext.destination);
      return oscillator;
    });

    if (!notes.length && currentColumn <= 15) {
      const gainNode = audioContext.createGain();
      const oscillator = audioContext.createOscillator();
      oscillator.start();
      oscillator.onended = () => nextColumn();
      oscillator.stop(audioContext.currentTime + period); // stop playing periods from now
      oscillator.connect(gainNode);
      gainNode.gain.value = 0;
      gainNode.connect(audioContext.destination);
    }

    if (currentColumn > 15) {
      stepGrid();
      startOver();
    }
  };
  if (playing) {
    synth(grid, currentColumn);
  }
  return (
    <div>
      <button onClick={stepGrid}>Step</button>
      <button onClick={play}>Play</button>
      <Grid grid={grid} currentColumn={currentColumn} />
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
  play: () => dispatch({ type: PLAY }),
  nextColumn: () => dispatch({ type: NEXT_COLUMN }),
  startOver: () => dispatch({ type: START_OVER }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
