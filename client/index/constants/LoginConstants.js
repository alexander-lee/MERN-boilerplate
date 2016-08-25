import _ from 'underscore';

const actions = [
  'SIGNUP',
  'LOGIN',
  'LOGOUT'
]

const hash = {};

_.each(actions, (action) => {
  hash[action] = action;
})

export default hash;
