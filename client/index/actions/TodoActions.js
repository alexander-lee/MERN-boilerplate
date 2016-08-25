import TodoConstants from '../constants/TodoConstants.js'

export function addTodo(text){
  return {
    type: TodoConstants.CREATE_TODO,
    text: text
  }
}

export function removeTodo(id){
  return {
    type: TodoConstants.DELETE_TODO,
    id: id
  }
}

export function markTodo(id){
  return {
    type: TodoConstants.MARK_TODO,
    id: id
  } 
}
