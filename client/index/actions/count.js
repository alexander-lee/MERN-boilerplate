  increase: function(n){
    return {
      type: 'INCREASE',
      amount: n
    }
  },

  decrease: function(n){
    return {
      type: 'DECREASE',
      amount: n
    }
  }
}
