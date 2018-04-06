import React from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';

import { SET_KEY } from '../constants';

import { PERIOD_MS } from '../../config/main.config';

// const freeverb = new Tone.Freeverb().toMaster();

// The amount of dampening of the reverberant signal. human hearing range is 20 - 20k hz ish
// freeverb.dampening.value = 30000;
// The roomSize value between. A larger roomSize will result in a longer decay. 0 - 1 i think
// freeverb.roomSize.value = .9;

const synth = new Tone.PolySynth(16, Tone.Synth);
const volume = new Tone.Volume(-24);
synth.chain(volume, Tone.Master);

const MusicBox = ({ notesToPlay, setKey }) => {
  synth.triggerAttackRelease(notesToPlay, .2);
  return (
    <div className="h-50">
      <div className="h-100">
        {/*<i className="fas fa-key"></i>*/}
        <button className="w-50 bg-light-red h-100" onClick={() => setKey(0)}>Major Pentatonic</button>
        <button className="w-50 bg-light-red h-100" onClick={() => setKey(1)}>Minor Pentatonic</button>
      </div>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MusicBox);
