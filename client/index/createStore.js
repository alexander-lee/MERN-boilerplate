var createStore = require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var combineReducers = require('redux').combineReducers;
var compose = require('redux').compose;

var thunk = require('redux-thunk').default;

var routerReducer = require('react-router-redux').routerReducer;
var routerMiddleware = require('react-router-redux').routerMiddleware;
var syncHistoryWithStore = require('react-router-redux').syncHistoryWithStore;

var browserHistory = require('react-router').browserHistory;

var rootReducer = require('./reducers/index.js');

var store = createStore(
  combineReducers({
    app: rootReducer,
    routing: routerReducer
  }), 
  compose(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(browserHistory)),
    //Dev Console
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )
);

var history = syncHistoryWithStore(browserHistory, store);

module.exports = {
  store: store,
  history: history
}
