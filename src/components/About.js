import React from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import { GridThing } from '../styles';

const About = () => (
  <div>
    <Header url="/" />
    <GridThing className="pl3 pr3 pt3-l ba bw3">
      <div className="f6 f5-l lh-copy measure tj center">
        <p>
          Patterns often emerge from chaotic action, sometimes only briefly. Their continuation
          balances along a knife's edge between entropy and order. To truly appreciate a chaotic
          world I picture each moment as a part of a longer song.
        </p>
        <p>
          <em>Blips</em> is inspired by <a className="link dim blue near-black" target="_blank" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Conway's Game of Life</a> and powered by React, Redux, Styled Components, and
          Tone.js. Source code is available <a className="link dim blue near-black" target="_blank" href="https://github.com/mikemfleming/game-of-life-synth">here</a>.
        </p>
        <Link className="link" to="/"><p className="f6 dim near-black">>> Back</p></Link>
      </div>
    </GridThing>
  </div>
);

export default About;
