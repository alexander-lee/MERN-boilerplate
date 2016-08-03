var _ = require('underscore');

var TodoConstants = require('../constants/TodoConstants.js');
var initalState = [];

module.exports = function(state, action){
  state = state || initalState;

  switch(action.type){
    case TodoConstants.CREATE_TODO:
      return [{
        id: (state.length === 0) ? 0 : state[0].id + 1,
        marked: false,
        text: action.text
      }].concat(state);

    case TodoConstants.DELETE_TODO:
      return state.filter(function(item){
        return action.id !== item.id
      })

    case TodoConstants.MARK_TODO:
      return state.map(function(item){
        return action.id === item.id ? _.extend({}, item, {marked: !item.marked}) : item
      })
    default:
      return state;
  }
}
