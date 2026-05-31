'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('applications', 'url', {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '',
    });

    await queryInterface.changeColumn('applications', 'salary', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('applications', 'url', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    });

    await queryInterface.changeColumn('applications', 'salary', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    });
  },
};
