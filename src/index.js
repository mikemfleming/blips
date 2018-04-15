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
    <GridThing className="pl3 pr3 ba bw3">
      <div className="f5 lh-copy measure tj center">
        <p>Lorem ipsum dolor amet coloring book gochujang tote bag, vice enamel pin prism whatever pitchfork. Snackwave tbh neutra poutine, hell of bespoke next level drinking vinegar shaman. Church-key chartreuse chambray, biodiesel live-edge jianbing wayfarers disrupt umami cold-pressed.</p>
        <p>Dreamcatcher irony woke shabby chic. Fingerstache cronut chia shaman, normcore man bun cray VHS tbh iceland poutine bespoke. Shabby chic bushwick ennui pabst, skateboard 3 wolf moon vexillologist. Mixtape pitchfork pour-over twee austin, wayfarers you probably haven't heard of them vaporware tumeric.</p>
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

