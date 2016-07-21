var Schema = {
  users: {
    id: {type: 'increments', nullable: false, primary: true},
    username: {type: 'string', maxlength: 20, nullable: false, unique: true},
    password: {type: 'string', maxlength: 150, nullable: false}
  },
  test: {
    id: {type: 'increments', nullable: false, primary: true},
    username: {type: 'string', maxlength: 20, nullable: false, unique: true},
    password: {type: 'string', maxlength: 150, nullable: false}
  }
}

module.exports = Schema;
