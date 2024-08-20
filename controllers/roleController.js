const { Role, Permission, UserRoles } = require('../models');

exports.createRole = async (req, res) => {
    try {
      // Create the role
      const role = await Role.create(req.body);
  
      // Fetch all permissions
      const permissions = await Permission.findAll();
  
      // Associate all permissions with the new role
      await role.addPermissions(permissions);
  
      res.status(201).json(role);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create role' });
    }
  };

exports.getRoles = async (req, res) => {
    try {
      const roles = await Role.findAll({
        include: [
          {
            model: Permission,
            as: 'permissions'
          }
        ]
      });
  
      // Fetch user count for each role
      const rolesWithUserCount = await Promise.all(
        roles.map(async (role) => {
          const userCount = await UserRoles.count({
            where: { roleId: role.id }
          });
  
          return {
            ...role.toJSON(),
            userCount
          };
        })
      );
  
      res.json(rolesWithUserCount);
    } catch (error) {
      console.error('Error retrieving roles:', error);
      res.status(500).json({ error: 'Failed to retrieve roles' });
    }
  };

exports.getRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id, {
        include: [{
            model: Permission,
            as: 'permissions'
          }]
      });
  
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve role' });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    await role.update(req.body);
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update role' });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    await role.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete role' });
  }
};
