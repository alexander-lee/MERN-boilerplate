import React from 'react';

export default class TodoItem extends React.Component {
  render() {
    const markTodo = () => this.props.markTodo(this.props.id);
    const removeTodo = () => this.props.removeTodo(this.props.id)
    return (
      <div>
        <button onClick={ removeTodo }>X</button>
        <input type="checkbox" checked={this.props.marked} onChange={ markTodo } />
        <label onClick={ markTodo }>{this.props.text}</label>
      </div>
    )
  }
};

TodoItem.propTypes = {
  id: React.PropTypes.number.isRequired,
  text: React.PropTypes.string.isRequired,
  marked: React.PropTypes.bool.isRequired,
  markTodo: React.PropTypes.func.isRequired,
  removeTodo: React.PropTypes.func.isRequired
};
