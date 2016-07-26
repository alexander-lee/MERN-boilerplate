/**
 Container Object
  - Interacts with the Redux Store through the connect() function
**/

var React = require('react');
var connect = require('react-redux').connect;
var _ = require('underscore');

var TodoActions = require('../actions/TodoActions.js');

var TodoItem = require('./TodoItem.jsx');

var TodoList = React.createClass({

  componentDidMount: function(){
  },

  _addTodo: function(){
    var text = this.refs.task_input.value;
    this.props.dispatch(TodoActions.addTodo(text));
  },

  _markTodo: function(id){
    this.props.dispatch(TodoActions.markTodo(id));
  },

  _removeTodo: function(id){
    this.props.dispatch(TodoActions.removeTodo(id));
  },

  render: function(){
    var todoList = [];
    _.each(this.props.todoList, function(item){
      todoList.push(<TodoItem id={item.id} 
                              text={item.text} 
                              marked={item.marked} 
                              markTodo={this._markTodo}
                              removeTodo={this._removeTodo} 
                              key={item.id} />)
    }, this);

    return (
      <div>
        <label> Add Task </label>
        <br />
        <input ref="task_input" type="text" placeholder="Task Name..." />
        <button onClick={this._addTodo}> Add</button>
        <br />
        {todoList}
      </div>
    );
  }
});

var mapStateToProps = function(state){
  return {
    todoList: state.app.todos
  }
}

module.exports = connect(mapStateToProps)(TodoList);
