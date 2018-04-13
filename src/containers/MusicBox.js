import React from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';

import { SET_KEY, START_GAME, STOP_GAME, STEP_GRID } from '../constants';

import { PERIOD_MS } from '../../config/main.config';

// const freeverb = new Tone.Freeverb().toMaster();

// The amount of dampening of the reverberant signal. human hearing range is 20 - 20k hz ish
// freeverb.dampening.value = 30000;
// The roomSize value between. A larger roomSize will result in a longer decay. 0 - 1 i think
// freeverb.roomSize.value = .9;

const synth = new Tone.PolySynth(16, Tone.Synth);
const volume = new Tone.Volume(-24);
synth.chain(volume, Tone.Master);

const MusicBox = ({ notesToPlay, setKey, playing, start, stop }) => {
  synth.triggerAttackRelease(notesToPlay, .2);
  return (
    <div className="h-50 pt2">
      <button className="f3 grow b--black mr1" onClick={() => setKey(0)}>Major Pentatonic</button>
      <button className="f3 grow b--black mr1" onClick={() => setKey(1)}>Minor Pentatonic</button>
      <button className="f3 grow b--black mr1" onClick={playing ? stop : start}>{playing ? 'Stop' : 'Start'}</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notesToPlay: state.musicBox.currentNotes,
  keys: state.musicBox.keys,
  playing: Boolean(state.interval),
});

const mapDispatchToProps = dispatch => ({
  setKey: index => dispatch({ type: SET_KEY, index }),
  start: () => dispatch({
    type: START_GAME,
    interval: setInterval(() => dispatch({ type: STEP_GRID }), PERIOD_MS),
  }),
  stop: () => dispatch({ type: STOP_GAME }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MusicBox);
