import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import _ from 'lodash';

import { getUser } from '../actions/user-actions';

class LoginPage extends Component {
  componentDidMount() {
    if(this.props.user.loggedIn) {
      this.props.dispatch(push('/'));
    }
  }

  render() {
    return (
      <div>
        <div className="login">
          <a href="/auth/google"><img className="button" src="/images/google-button.png" alt="Login with Google"/></a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: _.get(state, 'app.user'),
  }
}

export default connect(mapStateToProps)(LoginPage);
