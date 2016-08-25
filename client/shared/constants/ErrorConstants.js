import _ from 'underscore';

const actions = [
  'APPLICATION_ERROR'
]

const hash = {};

_.each(actions, (action) => {
  hash[action] = action;
})

export default hash;
