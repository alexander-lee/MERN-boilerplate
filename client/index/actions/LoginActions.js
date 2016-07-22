var $ = require('jquery');
var Promise = require('bluebird');

var push = require('react-router-redux').push;

var LoginConstants = require('../constants/LoginConstants');
var APIResponseHelper = require('../../shared/utils/APIResponseHelper');

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
        })
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
        dispatch(push(response.redirectTo));
      });
    }
  }
}
