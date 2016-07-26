var push = require('react-router-redux').push;

module.exports = function(dispatch, redirectURL){
  if(!redirectURL) 
    return;

  dispatch(push(redirectURL));
}
