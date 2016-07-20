var React = require('react');
var connect = require('react-redux').connect;

var LoginActions = require('../actions/LoginActions');

var Signup = React.createClass({
  render: function(){
    return (
      <div>
        <input type="text" placeholder="username" ref="username" />
        <input type="text" placeholder="password" ref="password" />
        <button onClick={this._onClick}>Signup</button>
      </div>
    );
  },

  _onClick: function(){
    var username = this.refs.username.value;
    var password = this.refs.password.value;

    if(!username || !password){
      console.log('Front End Error', 'No password/username given');
      return;
    }

    LoginActions.Signup({
      username: username,
      password: password
    })(this.props.dispatch);
  }
});

var mapStateToProps = function(state){
  return {
  }
}

module.exports = connect(mapStateToProps)(Signup);
