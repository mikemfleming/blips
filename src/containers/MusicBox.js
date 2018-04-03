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

const synth = new Tone.PolySynth(16, Tone.Synth).toMaster();

const MusicBox = ({ notesToPlay, setKey }) => {
  console.log(notesToPlay)
  synth.triggerAttackRelease(notesToPlay, '8n');
  return (
    <div>
      <div onClick={() => setKey(0)}>Major</div>
      <div onClick={() => setKey(1)}>Minor</div>
    </div>
  );
};

const mapStateToProps = ({ musicBox }) => ({
  notesToPlay: musicBox.currentNotes,
  keys: musicBox.keys,
});

const mapDispatchToProps = dispatch => ({
  setKey: index => dispatch({ type: SET_KEY, index }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MusicBox);
