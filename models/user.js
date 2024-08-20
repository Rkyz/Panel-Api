'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Role, { through: 'UserRoles', as: 'roles', foreignKey: 'userId' });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true, // Correct the spelling of unique
      allowNull: false // Optional: Ensuring username is not null
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false // Optional: Ensuring password is not null
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
