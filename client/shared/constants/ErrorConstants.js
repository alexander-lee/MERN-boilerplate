var _ = require('underscore');

var actions = [
  'APPLICATION_ERROR'
]

var hash = {};

_.each(actions, function(action){
  hash[action] = action;
})

module.exports = hash;
