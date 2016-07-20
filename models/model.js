var db = require('./db');

var User = db.Model.extend({
  tableName: 'users',
  idAttribute: 'id'
});

module.exports = {
  User: User
}
