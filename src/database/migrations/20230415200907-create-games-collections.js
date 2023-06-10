'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GamesCollections', {
      gameId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      gameName:  {
        type: Sequelize.STRING
      },
      yearPlayed: {
        type: Sequelize.INTEGER
      },
      hoursPlayed: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      platform: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GamesCollections');
  }
};