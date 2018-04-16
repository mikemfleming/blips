import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import styled from 'styled-components';
import { BrowserRouter, Route, BrowserHistory, Link } from 'react-router-dom';

import App from './containers/App';
import reducer from './reducers';

const middleware = applyMiddleware(createLogger());
const store = createStore(reducer, middleware);

const AppContainer = styled.div`
  margin: auto;
  max-width: 40vw;
  font-size: 1.5rem;
  @media (max-width: 768px) {
    max-width: 90vw;
  }
`;

const GridThing = styled.div`
  height: 40vw;
  @media (max-width: 768px) {
    height: 90vw;
  }
`;

const About = () => (
  <div>
    <Link to="/" className="link dim black"><h1 className="mb2">Blips of Life</h1></Link>
    <GridThing className="pl3 pr3 pt3-l ba bw3">
      <div className="f6 f5-l lh-copy measure tj center">
        <p>
          Patterns often emerge from chaotic action, sometimes only briefly. Their continuation balances
           along a knife's edge between entropy and order. To truly appreciate a chaotic world I
           picture each moment as a part of a longer song.
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

ReactDOM.render(
	<Provider store={store} >
    <BrowserRouter history={BrowserHistory}>
      <AppContainer>
        <Route path="/" exact component={App}/>
        <Route path="/about" component={About}/>
      </AppContainer>
    </BrowserRouter>
  </Provider>,
	document.getElementById('root')
);

