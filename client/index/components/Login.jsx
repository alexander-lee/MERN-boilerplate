import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as LoginActions from '../actions/LoginActions';

class Login extends React.Component {
  render() {
    return ( 
      <div>
        <input type="text" placeholder="username" ref="username"/>
        <input type="password" placeholder="password" ref="password"/>
        <button onClick={ () => this._onClick() }>Login</button>
        <Link to='/signup'>Signup</Link>
      </div>
    );
  }

  _onClick() {
    const username = this.refs.username.value;
    const password = this.refs.password.value;

    if(!username || !password){
      console.log('Front End Error', 'No password/username given');
      return;
    }

    LoginActions.login({
      username: username,
      password: password
    })(this.props.dispatch);
  }
}

function mapStateToProps(state){
  return {}
}


export default connect(mapStateToProps)(Login);
