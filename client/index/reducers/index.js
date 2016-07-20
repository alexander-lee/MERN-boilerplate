var combineReducers = require('redux').combineReducers;

var todo = require('./todos.js');
var login = require('./login.js');

module.exports = combineReducers({todo, login});
