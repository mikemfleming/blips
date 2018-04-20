import React from 'react';
import { connect } from 'react-redux';

import { PERIOD_MS, TOGGLE_KEY, START_GAME, STOP_GAME, STEP_GRID, RESET, TOGGLE_MUTE } from '../constants';

import ControlsComponent from '../components/Controls';

const Controls = ({
  toggleKey, playing, start, stop, isMajorKey, reset, toggleMute, isMuted,
}) => (
    <ControlsComponent
      playing={playing}
      start={start}
      stop={stop}
      reset={reset}
      toggleMute={toggleMute}
      toggleKey={toggleKey}
      isMajorKey={isMajorKey}
      isMuted={isMuted}
    />
  );

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
)(Controls);
