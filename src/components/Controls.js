import React from 'react';
import { ControlsContainer } from '../styles';

const Controls = ({ playing, stop, start, reset, toggleMute, toggleKey, isMajorKey, isMuted }) => (
  <ControlsContainer>
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
  </ControlsContainer>
);

export default Controls;
