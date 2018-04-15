import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import styled from 'styled-components';
import { BrowserRouter, Route, BrowserHistory } from 'react-router-dom';

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

const About = () => <div>asdasda</div>

ReactDOM.render(
	<Provider store={store} >
    <BrowserRouter history={BrowserHistory}>
      <AppContainer>
        <Route path="/" component={App}/>
        <Route path="/about" component={About}/>
      </AppContainer>
    </BrowserRouter>
  </Provider>,
	document.getElementById('root')
);

