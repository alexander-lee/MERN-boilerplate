var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var IndexRoute = require('react-router').IndexRoute;

var Provider = require('react-redux').Provider;

var IndexWrapper = require('./components/IndexWrapper.jsx');
var TodoList = require('./components/TodoList.jsx');

var Login = require('./components/Login.jsx');
var Signup = require('./components/Signup.jsx');

var store = require('./createStore.js').store;
var history = require('./createStore.js').history;

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
