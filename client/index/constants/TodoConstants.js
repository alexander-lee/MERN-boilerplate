var _ = require('underscore');

var actions = [
  'CREATE_TODO',
  'DELETE_TODO',
  'MARK_TODO'
]

var hash = {};

_.each(actions, function(action){
  hash[action] = action;
})

module.exports = hash;
