import React from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';
import styled from 'styled-components';

import { TOGGLE_KEY, START_GAME, STOP_GAME, STEP_GRID } from '../constants';

import { PERIOD_MS } from '../../config/main.config';

const Container = styled.div`
  height: 50%;
  padding-top: .5rem;

  .key-visualizer {
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: .2rem solid #111111;
    width: 10rem;
    height 2rem;
    background: white;
    &:hover {
      cursor: pointer;
      -moz-osx-font-smoothing: grayscale;
      backface-visibility: hidden;
      transform: translateZ(0);
      transition: transform 0.25s ease-out;
    }
    &:hover, &.focus { transform: scale(1.05); }
    &.grow:active { transform: scale(.90); }

  }

  .bouncey-ball {
    height: 10px;
    width: 10px;
    border-radius: 100%;
    background: #111111;
    &.bouncing { animation: bounce .5s ease-in-out infinite; }

    &.bouncing:nth-child(1) { animation-delay: .1s; }
    &.bouncing:nth-child(2) { animation-delay: .2s; }
    &.bouncing:nth-child(3) { animation-delay: .3s; }
    &.bouncing:nth-child(4) { animation-delay: .4s; }
    &.bouncing:nth-child(5) { animation-delay: .5s; }
  }

  @keyframes bounce {
    0% { background-color: #9400D3;  }
    20% { background-color: #0000FF; }
    25% { transform: translateY(5px); }
    40% { background-color: #00FF00; }
    60% { background-color: #FFFF00; }
    75% { transform: translateY(-5px); }
    80% { background-color: #FF7F00; }
    100% { background-color: #FF0000; }
  }
`;

const synth = new Tone.PolySynth(16, Tone.Synth);
const volume = new Tone.Volume(-24);
synth.chain(volume, Tone.Master);

const MusicBox = ({ notesToPlay, toggleKey, playing, start, stop }) => {
  synth.triggerAttackRelease(notesToPlay, .2);
  return (
    <Container>
      <div className="fl w-50">
        <div className="key-visualizer" onClick={toggleKey}>
          <div className={`bouncey-ball ${playing ? 'bouncing' : ''}`}></div>
          <div className={`bouncey-ball ${playing ? 'bouncing' : ''}`}></div>
          <div className={`bouncey-ball ${playing ? 'bouncing' : ''}`}></div>
          <div className={`bouncey-ball ${playing ? 'bouncing' : ''}`}></div>
          <div className={`bouncey-ball ${playing ? 'bouncing' : ''}`}></div>
        </div>
      </div>
      <div className="fl w-50">
        <i className={`fas ${playing ? 'fa-pause' : 'fa-play'} fr pointer`} onClick={playing ? stop : start}></i>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  notesToPlay: state.musicBox.currentNotes,
  keys: state.musicBox.keys,
  playing: Boolean(state.interval),
});

const mapDispatchToProps = dispatch => ({
  toggleKey: index => dispatch({ type: TOGGLE_KEY, index }),
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
