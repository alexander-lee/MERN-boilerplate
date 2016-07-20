var LoginConstants = require('../constants/LoginConstants')

const initialState = {
  loggedIn: false
}

module.exports = function(state, action){
  state = state || initialState;

  switch(action.type){
    case LoginConstants.LOGIN:
      return {

      }
    default:
      return state;
  }
}
