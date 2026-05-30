'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add location field to chats table
    await queryInterface.addColumn('chats', 'location', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.renameColumn('chats', 'user_ip', 'ip');
  },

  async down(queryInterface, Sequelize) {
    // Remove the added column
    await queryInterface.removeColumn('chats', 'location');
    await queryInterface.renameColumn('chats', 'ip', 'user_ip');
  },
};
