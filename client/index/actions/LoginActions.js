var $ = require('jquery');
var Promise = require('bluebird');

var LoginConstants = require('../constants/LoginConstants');

module.exports = {
  Signup: function(model){
    return function(dispatch){
      Promise.resolve($.ajax({
        method: 'POST',
        url: '/users',
        data: model
      }))
      .then(function(res){
        console.log(res);
        if(res.success){
          dispatch({
            type: LoginConstants.SIGNUP,
            data: res.data
          })
        }
        else {
          throw new Error(res.msg);
        }
      })
      .catch(function(err){
        console.log(err);
        dispatch({
          type: LoginConstants.ERROR,
          msg: err
        })
      })
    }
  }
}
