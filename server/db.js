var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testdb',
    charset: 'utf8'
  },
  debug: true
});

var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
