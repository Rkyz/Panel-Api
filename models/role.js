'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.belongsToMany(models.Permission, { through: 'RolePermissions', as: 'permissions', foreignKey: 'roleId', });
      Role.belongsToMany(models.User, { through: 'UserRoles', as: 'users', foreignKey: 'roleId' });
    }
  }
  Role.init({
    name: DataTypes.STRING,
    maxUsers: DataTypes.INTEGER // Add this line
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};