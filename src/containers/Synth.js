import React from 'react';
import { connect } from 'react-redux';
import Tone from '../../tone';

import { STEP_GRID, PLAY, NEXT_COLUMN, START_OVER, START } from '../constants';

const synth = new Tone.Synth().toMaster();

const Synth = ({ grid, tone, nextColumn }) => {
  tone.Transport.scheduleRepeat((time) => {
    grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.status) synth.triggerAttackRelease(cell.note, '8n');
      });
    });
    nextColumn();
  }, '8n');
  // if (playing) {
  //   Tone.Transport.start();
  //   Tone.Transport.scheduleRepeat((time) => {
  //     nextColumn();
  //   }, '8n');
  //
  //   grid.forEach((row) => {
  //     row.forEach((cell) => {
  //       if (cell.status) synth.triggerAttackRelease(cell.note, '8n');
  //     });
  //   });
  // }
  return <h1><span>🔉</span></h1>;
};

const mapStateToProps = state => ({
  grid: state.grid,
  tone: state.tone,
});

const mapDispatchToProps = dispatch => ({
  stepGrid: () => dispatch({ type: STEP_GRID }),
  play: () => dispatch({ type: PLAY }),
  nextColumn: () => dispatch({ type: NEXT_COLUMN }),
  start: () => dispatch({ type: START }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Synth);


//
//
// const audioContext = new AudioContext();
// const impulseBuffer = impulseResponse(2,4,false);
// const convolver = audioContext.createConvolver()
// convolver.buffer = impulseBuffer;
// convolver.connect(audioContext.destination);
// const period = .075;
//
// function impulseResponse( duration, decay, reverse ) {
//   var sampleRate = audioContext.sampleRate;
//   var length = sampleRate * duration;
//   var impulse = audioContext.createBuffer(2, length, sampleRate);
//   var impulseL = impulse.getChannelData(0);
//   var impulseR = impulse.getChannelData(1);
//
//   if (!decay)
//     decay = 2.0;
//   for (var i = 0; i < length; i++){
//     var n = reverse ? length - i : i;
//     impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
//     impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
//   }
//   return impulse;
// }
//
// const synth = (grid, currentColumn) => {
//   const notes = [];
//   for (let y = 0; y < grid[0].length; y += 1) {
//     if (grid[y][currentColumn]) {
//       notes.push(y);
//     }
//   }
//   const oscillators = notes.map((note, idx) => {
//     note += 1;
//     const oscillator = audioContext.createOscillator();
//     const gainNode = audioContext.createGain();
//     oscillator.frequency.value = (note * 55) * (3/2); // middle c and pentatonic ratio
//     gainNode.gain.value = 0.1;
//     oscillator.type = 'sine';
//     oscillator.start();
//     if (!idx) oscillator.onended = () => nextColumn();
//     oscillator.stop(audioContext.currentTime + period); // stop playing periods from now
//     oscillator.connect(gainNode);
//     // convolver.connect(gainNode);
//     gainNode.connect(audioContext.destination);
//     return oscillator;
//   });
//
//   if (!notes.length && currentColumn <= 15) {
//     const gainNode = audioContext.createGain();
//     const oscillator = audioContext.createOscillator();
//     oscillator.start();
//     oscillator.onended = () => nextColumn();
//     oscillator.stop(audioContext.currentTime + period); // stop playing periods from now
//     oscillator.connect(gainNode);
//     gainNode.gain.value = 0;
//     gainNode.connect(audioContext.destination);
//   }
//
//   if (currentColumn > 15) {
//     stepGrid();
//     startOver();
//   }
// };
