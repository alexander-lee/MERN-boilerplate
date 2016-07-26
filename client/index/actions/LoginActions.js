var $ = require('jquery');
var Promise = require('bluebird');

var LoginConstants = require('../constants/LoginConstants');
var APIResponseHelper = require('../../shared/utils/APIResponseHelper');
var RedirectHelper = require('../../shared/utils/RedirectHelper');

module.exports = {
  signup: function(model){
    return function(dispatch){
      var promise = $.ajax({
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
  },

  login: function(model){
    return function(dispatch){
      var promise = $.ajax({
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
  },

  logout: function(){
    return function(dispatch){
      var promise = $.ajax({
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
}
