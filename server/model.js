var db = require('./db').db;

var User = db.Model.extend({
  tableName: 'users',
  idAttribute: 'id'
});

module.exports = {
  User: User
}
