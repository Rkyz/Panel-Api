'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Roles', 'maxUsers', {
      type: Sequelize.BIGINT,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Roles', 'maxUsers');
  }
};
