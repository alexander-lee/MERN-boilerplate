var LoginConstants = require('../constants/LoginConstants')

const initialState = {
  loggedIn: false
}

module.exports = function(state, action){
  state = state || initialState;

  switch(action.type){
    case LoginConstants.LOGIN:
      return {
        loggedIn: true 
      }
    case LoginConstants.LOGOUT:
      return {
        loggedIn: false
      }
    default:
      return state;
  }
}
