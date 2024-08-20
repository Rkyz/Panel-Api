const { Role, User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const { roleId } = req.body;
    console.log(roleId,'china')

    if (roleId) {
      const role = await Role.findByPk(roleId);
      console.log(role,'asu')

      if (!role) {
        return res.status(400).json({ error: 'Role not found' });
      }

      const userCount = await role.countUsers();
      if (role.maxUsers && userCount >= role.maxUsers) {
        return res.status(400).json({ error: 'Role limit reached. Cannot assign more users to this role.' });
      }
    }

    next();
  } catch (error) {
    console.error('Error in role limit middleware:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
};
