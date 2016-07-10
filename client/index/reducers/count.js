var initialState = {
  number: 1
}

module.exports = function(state, action){
  state = state || initialState;

  switch (action.type){
    case 'INCREASE':
      return {
        number: state.number + action.amount
      }
    case 'DECREASE':
      return {
        number: state.number - action.amount
      }
    default:
      return state;
  }
}
