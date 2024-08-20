const { User, Role, Permission } = require('../models');

// Get all users with their roles and permissions
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Role,
          as: 'roles',
          include: [
            {
              model: Permission,
               as: 'permissions'
            }
          ]
        }
      ]
    });
    const transformedUsers = users.map(user => {
      // Check if user has roles
      const updatedRoles = user.roles.length === 0 
        ? 'No Roles Available'
        : user.roles.map(role => {
            // Check if role has permissions
            const updatedPermissions = role.permissions.length === 0 
              ? 'No Permissions Available'
              : role.permissions;
            
            return {
              ...role.toJSON(),
              permissions: updatedPermissions
            };
          });

      return {
        ...user.toJSON(),
        roles: updatedRoles
      };
    });
    res.json(transformedUsers);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

// Get a specific user by ID with their roles and permissions
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        {
          model: Role,
          through: { attributes: [] },
          include: [
            {
              model: Permission,
              through: { attributes: [] }
            }
          ]
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

// Update a specific user by ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.update(req.body);
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete a specific user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// Edit user roles
exports.updateUserRoles = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const roles = await Role.findAll({
      where: {
        id: req.body.roleIds
      },
      include: [
        {
          model: Permission,
          through: { attributes: [] }
        }
      ]
    });

    await user.setRoles(roles);
    const updatedUser = await User.findByPk(req.params.id, {
      include: [
        {
          model: Role,
          through: { attributes: [] },
          include: [
            {
              model: Permission,
              through: { attributes: [] }
            }
          ]
        }
      ]
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user roles:', error);
    res.status(500).json({ error: 'Failed to update user roles' });
  }
};
