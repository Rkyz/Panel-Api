const { Role, Permission, RolePermissions } = require('../models');

module.exports = (permission) => {
  return async (req, res, next) => {
    try {
      const role = await Role.findByPk(req.user.roleId, {
        include: [
          {
            model: Permission,
            as: 'permissions',
            through: {
              model: RolePermissions,
              attributes: ['value']
            }
          }
        ]
      });

      console.log('Role data:', JSON.stringify(role, null, 2));

      if (!role) {
        return res.status(403).json({
          error: 'Access denied',
          message: 'Your role does not exist. Please contact the administrator.'
        });
      }

        const hasAllPermission = role.permissions.some(
            perm => 
            (perm.action === 'ALL_PERMISSION' && perm.RolePermissions.value === true) || (perm.action === 'OWNER_PERMISSION' && perm.RolePermissions.value === true)
        );
  

      if (hasAllPermission) {
        return next(); 
      }

      const hasSpecificPermission = role.permissions.some(
        perm => perm.action === permission && perm.RolePermissions.value === true
      );

      if (!hasSpecificPermission) {
        return res.status(403).json({
          error: 'Access denied',
          message: `You do not have the necessary permissions (${permission}) to access this resource. Please contact the administrator if you believe this is an error.`
        });
      }

      next();
    } catch (error) {
      res.status(500).json({
        error: 'Authorization failed',
        message: 'There was an error processing your request. Please try again later.',
        details: error.message
      });
    }
  };
};
