var _ = require('underscore');

var actions = [
  'SIGNUP',
  'LOGIN',
  'ERROR'
]

var hash = {};

_.each(actions, function(action){
  hash[action] = action;
})

module.exports = hash;
