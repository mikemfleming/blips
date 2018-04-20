import React from 'react';

import Link from './Link';
import Header from './Header';
import { Box } from '../styles';

const About = () => (
  <div>
    <Header url="/" />
    <Box className="pl3 pr3 pt3-l ba bw3">
      <div className="f6 f5-l lh-copy measure tj center">
        <p>
          Patterns often emerge from chaotic action, sometimes only briefly. Their continuation
          balances along a knife's edge between entropy and order. <em>Blips</em> reimagines each
          step on this path as a melody in a longer song.
        </p>
        <p>
          Inspired by <a className="link dim blue near-black" target="_blank" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Conway's Game of Life</a> and powered by React, Redux, Styled Components, and Tone.js.
        </p>
        <Link url="/" text=">> Back" />
      </div>
    </Box>
  </div>
);

export default About;
