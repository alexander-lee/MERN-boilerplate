export default {
  up: function(queryInterface, Sequelize) {
    const mods = [
      queryInterface.addColumn('User', 'token', {
        allowNull: true,
        type: Sequelize.STRING
      }),

      queryInterface.addColumn('User', 'refreshToken', {
          allowNull: true,
          type: Sequelize.STRING
      }),
    ];

    return Promise.all(mods);
  },
  down: function(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('User', 'token'),
      queryInterface.removeColumn('User', 'refreshToken')
    ]);
  }
}
