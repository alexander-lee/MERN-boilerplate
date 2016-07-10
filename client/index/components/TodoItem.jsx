var React = require('react');

var TodoItem = React.createClass({
  propTypes: {
    id: React.PropTypes.number.isRequired,
    text: React.PropTypes.string.isRequired,
    marked: React.PropTypes.bool.isRequired,
    markTodo: React.PropTypes.func.isRequired,
    removeTodo: React.PropTypes.func.isRequired
  },

  render: function(){
    var markTodo = function(){this.props.markTodo(this.props.id)}.bind(this);
    var removeTodo = function(){this.props.removeTodo(this.props.id)}.bind(this);
    return (
      <div>
        <button onClick={ removeTodo }>X</button>
        <input type="checkbox" checked={this.props.marked} onChange={ markTodo } />
        <label onClick={ markTodo }>{this.props.text}</label>
      </div>
    )
  }
});

module.exports = TodoItem
