'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('stats', 'visitor_country', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Unknown',
    });
    await queryInterface.addColumn('stats', 'visitor_browser', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Unknown',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('stats', 'visitor_country');
    await queryInterface.removeColumn('stats', 'visitor_browser');
  },
};
