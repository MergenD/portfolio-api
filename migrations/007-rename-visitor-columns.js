'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Rename visitor_ip to ip
    await queryInterface.renameColumn('stats', 'visitor_ip', 'ip');

    // Rename visitor_location to location
    await queryInterface.renameColumn('stats', 'visitor_location', 'location');

    // Rename visitor_country to country
    await queryInterface.renameColumn('stats', 'visitor_country', 'country');

    // Rename visitor_browser to device
    await queryInterface.renameColumn('stats', 'visitor_browser', 'device');
  },

  async down(queryInterface, Sequelize) {
    // Revert the changes
    await queryInterface.renameColumn('stats', 'ip', 'visitor_ip');
    await queryInterface.renameColumn('stats', 'location', 'visitor_location');
    await queryInterface.renameColumn('stats', 'country', 'visitor_country');
    await queryInterface.renameColumn('stats', 'device', 'visitor_browser');
  },
};
