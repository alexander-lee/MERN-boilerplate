import _ from 'underscore';

const actions = [
  'CREATE_TODO',
  'DELETE_TODO',
  'MARK_TODO'
]

const hash = {};

_.each(actions, (action) => {
  hash[action] = action;
})

export default hash;
