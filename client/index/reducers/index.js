var combineReducers = require('redux').combineReducers;

var todos = require('./TodoReducer.js');
var login = require('./LoginReducer.js');

module.exports = combineReducers({todos, login});
