var db = require('../config.js')[process.env.NODE_ENV].db;

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: db.host,
    user: db.username,
    password: db.password,
    database: db.name,
    charset: 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
