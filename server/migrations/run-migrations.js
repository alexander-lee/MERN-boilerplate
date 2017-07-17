import Umzug from 'umzug';
import { DataTypes } from 'sequelize';

import models from '../models';

const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize: models.sequelize,
  },
  // The logging function.
  // A function that gets executed everytime migrations start and have ended.
  logging: console.log,
  // The name of the positive method in migrations.
  upName: 'up',
  // The name of the negative method in migrations.
  downName: 'down',
  migrations: {
    // The params that gets passed to the migrations.
    // Might be an array or a synchronous function which returns an array.
    params: [models.sequelize.getQueryInterface(), DataTypes],
    // The path to the migrations directory.
    path: __dirname,
    // The pattern that determines whether or not a file is a migration.
    pattern: /^\d+[\w-]+\.js$/,
    // A function that receives and returns the to be executed function.
    // This can be used to modify the function.
    wrap: function (func) { return func; },
  },
});

export async function runMigrations() {
  try {
    const pending = await umzug.pending();
    const runMigrations = await umzug.up();
  } catch (e) {
    console.log('Error: Running Migrations');
    console.log(e);
    throw e;
  }
  await models.sequelize.sync();
}

export default umzug;
