var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var IndexRoute = require('react-router').IndexRoute;
var browserHistory = require('react-router').browserHistory;

var createStore = require('redux').createStore;
var combineReducers = require('redux').combineReducers;
var applyMiddleware = require('redux').applyMiddleware;

var Provider = require('react-redux').Provider;

var IndexWrapper = require('./components/IndexWrapper.jsx');
var IndexWindow = require('./components/IndexWindow.jsx');
var TodoList = require('./components/TodoList.jsx');

var todo = require('./reducers/todos.js');

var store = createStore(todo, window.devToolsExtension && window.devToolsExtension())

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={IndexWrapper}>
        <IndexRoute component={TodoList} />
        <Route path="*" component={IndexWindow} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('content')
);
