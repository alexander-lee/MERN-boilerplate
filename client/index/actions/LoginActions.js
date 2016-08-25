import $ from 'jquery';
import Promise from 'bluebird';

import LoginConstants from '../constants/LoginConstants';
import APIResponseHelper from '../../shared/utils/APIResponseHelper';
import RedirectHelper from '../../shared/utils/RedirectHelper';

export function signup(model){
  return function(dispatch){
    const promise = $.ajax({
      method: 'POST',
      url: '/users',
      data: model
    });

    APIResponseHelper(promise, dispatch,
    function(response){
      dispatch({
        type: LoginConstants.SIGNUP,
        data: response.data
      });
    });
  }
}

export function login(model){
  return function(dispatch){
    const promise = $.ajax({
      method: 'POST',
      url: '/login',
      data: model
    });

    APIResponseHelper(promise, dispatch,
    function(response){
      dispatch({
        type: LoginConstants.LOGIN
      });
      RedirectHelper(dispatch, response.redirectTo);
    });
  }
}

export function logout(){
  return function(dispatch){
    const promise = $.ajax({
      method: 'POST',
      url: '/logout',
    });

    APIResponseHelper(promise, dispatch,
    function(response){
      dispatch({
        type: LoginConstants.LOGOUT
      });
      RedirectHelper(dispatch, response.redirectTo);
    });
  } 
}
