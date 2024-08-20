'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('RolePermissions', 'value', {
      type: Sequelize.BIGINT,
      allowNull: false,
      defaultValue: false // Set default value to true, adjust if necessary
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('RolePermissions', 'value');
  }
};
