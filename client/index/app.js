var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var IndexRoute = require('react-router').IndexRoute;
var browserHistory = require('react-router').browserHistory;

var createStore = require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var combineReducers = require('redux').combineReducers;
var compose = require('redux').compose;

var Provider = require('react-redux').Provider;

var syncHistoryWithStore = require('react-router-redux').syncHistoryWithStore;
var routerReducer = require('react-router-redux').routerReducer;
var routerMiddleware = require('react-router-redux').routerMiddleware;

var thunk = require('redux-thunk').default;

var IndexWrapper = require('./components/IndexWrapper.jsx');
var TodoList = require('./components/TodoList.jsx');

var Login = require('./components/Login.jsx');
var Signup = require('./components/Signup.jsx');

var reducer = require('./reducers/index.js');

var store = createStore(
  combineReducers({
    app: reducer,
    routing: routerReducer
  }), 
  compose(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(browserHistory)),
    //Dev Console
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )
)

var history = syncHistoryWithStore(browserHistory, store);

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
