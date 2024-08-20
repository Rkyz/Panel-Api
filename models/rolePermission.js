'use strict';
module.exports = (sequelize, DataTypes) => {
  const RolePermissions = sequelize.define('RolePermissions', {
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    permissionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    value: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Default value to false, adjust if necessary
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
  }, {});
  return RolePermissions;
};
