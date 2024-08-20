'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password123', 10);

    await queryInterface.bulkInsert('Users', [
      {
        username: 'Owner',
        password: hashedPassword,
        roleId: 1, // Assuming 'Admin' role has ID 1
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user',
        password: hashedPassword,
        roleId: 2, // Assuming 'User' role has ID 2
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
