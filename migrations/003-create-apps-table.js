'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('apps', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      applied: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      rejected: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      interview: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      offer: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('apps');
  },
};
