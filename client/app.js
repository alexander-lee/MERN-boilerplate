import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import App from './scenes/App';
import LoginPage from './scenes/LoginPage';
import LandingPage from './scenes/LandingPage';
import ErrorPage from './scenes/ErrorPage';

import { store, history } from './create-store';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={LandingPage} />
        <Route path="login" component={LoginPage} />
      </Route>
      <Route path="*" component={ErrorPage} />
    </Router>
  </Provider>,
  document.getElementById('content')
);
