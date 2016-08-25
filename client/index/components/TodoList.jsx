/**
 Container Object
  - Interacts with the Redux Store through the connect() function
**/

import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import * as TodoActions from '../actions/TodoActions.js';

import TodoItem from './TodoItem.jsx';

class TodoList extends React.Component {
  constructor(props){
    super(props);
  }

  _addTodo() {
    const text = this.refs.task_input.value;
    this.props.dispatch(TodoActions.addTodo(text));
  }

  _markTodo(id) {
    this.props.dispatch(TodoActions.markTodo(id));
  }

  _removeTodo(id) {
    this.props.dispatch(TodoActions.removeTodo(id));
  }

  render() {
    const todoList = [];
    _.each(this.props.todoList, (item) => {
      todoList.push(<TodoItem id={item.id} 
                              text={item.text} 
                              marked={item.marked} 
                              markTodo={this._markTodo.bind(this)}
                              removeTodo={this._removeTodo.bind(this)} 
                              key={item.id} />)
    });

    return (
      <div>
        <label> Add Task </label>
        <br />
        <input ref="task_input" type="text" placeholder="Task Name..." />
        <button onClick={ () => this._addTodo() }> Add</button>
        <br />
        {todoList}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todoList: state.app.todos
  }
}

export default connect(mapStateToProps)(TodoList);
