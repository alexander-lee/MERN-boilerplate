import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

let sequelize = new Sequelize(config.name, config.username, config.password, config);
let db = {};

fs.readdirSync(__dirname)
  .filter(function(file){
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file){
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if('associate' in db[modelName]){
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


export default db;
