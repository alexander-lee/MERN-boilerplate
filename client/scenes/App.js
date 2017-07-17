import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '../components/Modal';
import LoginPage from './LoginPage';

import { getUser } from '../actions/user-actions';

class App extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  _renderMain = () => {
    return (
      <div className="index-wrapper">
        <SideBar />
        { this.props.children }
      </div>
    );
  }

  render() {
    let body;
    if(this.props.user.loggedIn) {
      body = this._renderMain();
    }
    else if(window.location.pathname === '/login') {
      body = <LoginPage />;
    }
  }
}

function mapStateToProps(state) {
  const user = _.get(state, 'app.user');
  return { user };
}

function mapDispatchToProps(dispatch) {
  return {
    getUser: () => {
      dispatch(getUser());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
