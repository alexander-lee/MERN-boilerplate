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

var Schema = require('./schema');
var _ = require('underscore');
var Promise = require('bluebird'); 

function createTable(tableName){
  return knex.schema.createTableIfNotExists(tableName, function(table){
    var column;
    var columnKeys = _.keys(Schema[tableName]);

    _.each(columnKeys, function (key) {
      //Set the Table Key Types (Edge Cases for 'text' and 'string' types)
      //Set our Column here
      if (Schema[tableName][key].type === 'text' && Schema[tableName][key].hasOwnProperty('fieldtype')) {
        column = table[Schema[tableName][key].type](key, Schema[tableName][key].fieldtype);
      }
      else if (Schema[tableName][key].type === 'string' && Schema[tableName][key].hasOwnProperty('maxlength')) {
        column = table[Schema[tableName][key].type](key, Schema[tableName][key].maxlength);
      }
      else {
        column = table[Schema[tableName][key].type](key);
      }

      //Set if Table Property is Nullable
      if (Schema[tableName][key].hasOwnProperty('nullable') && Schema[tableName][key].nullable === true) {
        column.nullable();
      }
      else {
        column.notNullable();
      }

      //Set if Table Property is Primary
      if (Schema[tableName][key].hasOwnProperty('primary') && Schema[tableName][key].primary === true) {
        column.primary();
      }
      //Set if Table Property is Unique
      if (Schema[tableName][key].hasOwnProperty('unique') && Schema[tableName][key].unique) {
        column.unique();
      }
      //Set if Table Property is unsigned
      if (Schema[tableName][key].hasOwnProperty('unsigned') && Schema[tableName][key].unsigned) {
        column.unsigned();
      }
      //Set Table Property references
      if (Schema[tableName][key].hasOwnProperty('references')) {
        column.references(Schema[tableName][key].references);
      }
      //Set Table's defaultTo Property
      if (Schema[tableName][key].hasOwnProperty('defaultTo')) {
        column.defaultTo(Schema[tableName][key].defaultTo);
      }
    });
  });
}

function createTables(){
  var tables = [];
  var tableNames = _.keys(Schema);

  tables = _.map(tableNames, function(tableName){
    return knex.schema.hasTable(tableName)
    .then(function(exists){
      if(!exists)
        return createTable(tableName);
    });
  });

  return Promise.all(tables);
}

function dropTables(){
  var tables = [];
  var tableNames = _.keys(Schema);

  tables = _.map(tableNames, function(tableName){
    return knex.schema.hasTable(tableName)
    .then(function(exists){
      if(exists)
        return knex.schema.dropTable(tableName);
    });
  });

  return Promise.all(tables);
}

module.exports.create = function(){
  createTables()
  .then(function(){
    console.log('Tables Created!');
    process.exit(0);
  })
  .catch(function(err){
    throw err;
  })  
}

module.exports.drop = function(){
  dropTables()
  .then(function(){
    console.log('Tables Dropped!');
    process.exit(0);
  })
  .catch(function(err){
    throw err;
  })
}

