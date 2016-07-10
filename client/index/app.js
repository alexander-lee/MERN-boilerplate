var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={} />
    <Route path="*" component={} />
  </Router>,
  document.getElementById('content')
);
