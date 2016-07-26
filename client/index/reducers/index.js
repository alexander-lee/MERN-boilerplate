var combineReducers = require('redux').combineReducers;

var todos = require('./todos.js');
var login = require('./login.js');

module.exports = combineReducers({todos, login});
