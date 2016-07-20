var React = require('react');
var connect = require('react-redux').connect;

var Login = React.createClass({
  render: function(){
    return (
      <input type="text" placeholder="username" />
      <input type="text" placeholder="password" />
      <button onClick={this._onClick}>Login</button>
    );
  },

  _onClick: function(){
    
  }
});



module.exports = Login;
