var _ = require('underscore');

var actions = [
  'SIGNUP',
  'LOGIN',
  'LOGOUT'
]

var hash = {};

_.each(actions, function(action){
  hash[action] = action;
})

module.exports = hash;
