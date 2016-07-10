var React = require('react');
var connect = require('react-redux').connect;
var CountActions = require('../actions/count.js');

var IndexWindow = React.createClass({
  render: function(){
    return (
      <div className="window">
        {this.props.number}
        <button onClick={this._increment}>+</button>
        <button onClick={this._decrement}>-</button>
      </div>
    );
  },

  _increment: function(){
    this.props.dispatch(CountActions.increase(1))
  },

  _decrement: function(){
    this.props.dispatch(CountActions.decrease(1))
  }
});

var mapStateToProps = function(state){
  return {
    number: state.number
  }
}

module.exports = connect(mapStateToProps)(IndexWindow);
