import React from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';

import { PERIOD_MS } from '../../config/main.config';

// const freeverb = new Tone.Freeverb().toMaster();

// The amount of dampening of the reverberant signal. human hearing range is 20 - 20k hz ish
// freeverb.dampening.value = 30000;
// The roomSize value between. A larger roomSize will result in a longer decay. 0 - 1 i think
// freeverb.roomSize.value = .9;

const synth = new Tone.PolySynth(16, Tone.Synth).toMaster();

const MusicBox = ({ notes }) => {
  synth.triggerAttackRelease(notes, '8n');
  return <div>asd</div>;
};

const mapStateToProps = state => ({
  // good place for music box settings
});

const mapDispatchToProps = dispatch => ({
  // good place for music box actions
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MusicBox);
