import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Link, IndexRoute } from 'react-router';

import { Provider } from 'react-redux';

import IndexWrapper from './components/IndexWrapper.jsx';
import TodoList from './components/TodoList.jsx';

import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';

import { store, history } from './createStore';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={IndexWrapper}>
        <IndexRoute component={Login} />
        <Route path="signup" component={Signup} />
        <Route path="*" component={TodoList} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('content')
);
