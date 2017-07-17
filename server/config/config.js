export default {
  development: {
    host: 'localhost',
    username: 'root',
    password: '',
    dialect: 'mysql',
    logging: console.log,
    name: 'MyDatabase',
    define: {
      freezeTableName: true
    }
  },
  production: {
    host: 'mysql',
    username: 'test',
    password: 'test',
    dialect: 'mysql',
    logging: false,
    name: 'MyDatabase',
    define: {
      freezeTableName: true
    }
  }
}
