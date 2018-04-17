import React from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';

import { TOGGLE_KEY, START_GAME, STOP_GAME, STEP_GRID, RESET, TOGGLE_MUTE } from '../constants';

import { PERIOD_MS } from '../../config/main.config';

import { Container } from '../styles';

const synth = new Tone.PolySynth(16, Tone.Synth);
const volume = new Tone.Volume(-16);
synth.chain(volume, Tone.Master);

const MusicBox = ({
  notesToPlay, toggleKey, playing, start, stop, isMajorKey, reset, toggleMute, isMuted,
}) => {
  volume.mute = isMuted;
  synth.triggerAttackRelease(notesToPlay, 0.2);
  return (
    <Container>
      <div className="fl w-50">
        <i className={`fas ${playing ? 'fa-pause' : 'fa-play'} pointer mr2`} onClick={playing ? stop : start} />
        <i className={`fas mr2 fa-times ${playing ? '' : 'pointer'}`} onClick={playing ? null : reset} />
        <i className={`fas pointer mr2 ${isMuted ? 'fa-volume-off' : 'fa-volume-up'}`} onClick={toggleMute} />
      </div>
      <div className="fl w-50">
        <div className="key-visualizer fr" onClick={toggleKey}>
          <div className={`bouncey-ball ${playing ? 'bouncing' : ''} ${isMajorKey ? 'major' : 'minor'}`} />
          <div className={`bouncey-ball ${playing ? 'bouncing' : ''} ${isMajorKey ? 'major' : 'minor'}`} />
          <div className={`bouncey-ball ${playing ? 'bouncing' : ''} ${isMajorKey ? 'major' : 'minor'}`} />
          <div className={`bouncey-ball ${playing ? 'bouncing' : ''} ${isMajorKey ? 'major' : 'minor'}`} />
          <div className={`bouncey-ball ${playing ? 'bouncing' : ''} ${isMajorKey ? 'major' : 'minor'}`} />
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = state => ({
  notesToPlay: state.musicBox.currentNotes,
  keys: state.musicBox.keys,
  playing: Boolean(state.interval),
  isMajorKey: state.musicBox.currentKey === 0,
  isMuted: state.musicBox.mute,
});

const mapDispatchToProps = dispatch => ({
  toggleKey: index => dispatch({ type: TOGGLE_KEY, index }),
  start: () => dispatch({
    type: START_GAME,
    interval: setInterval(() => dispatch({ type: STEP_GRID }), PERIOD_MS),
  }),
  stop: () => dispatch({ type: STOP_GAME }),
  reset: () => dispatch({ type: RESET }),
  toggleMute: () => dispatch({ type: TOGGLE_MUTE }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MusicBox);
