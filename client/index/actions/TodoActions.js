var TodoConstants = require('../constants/TodoConstants.js')

module.exports = {
  addTodo: function(text){
    return {
      type: TodoConstants.CREATE_TODO,
      text: text
    }
  },

  removeTodo: function(id){
    return {
      type: TodoConstants.DELETE_TODO,
      id: id
    }
  },

  markTodo: function(id){
    return {
      type: TodoConstants.MARK_TODO,
      id: id
    }
  }
}
