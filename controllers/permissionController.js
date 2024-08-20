const { Permission } = require('../models');

exports.createPermission = async (req, res) => {
  try {
    const permission = await Permission.create(req.body);
    res.status(201).json(permission);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create permission' });
  }
};

exports.getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve permissions' });
  }
};

exports.getPermission = async (req, res) => {
  try {
    const permission = await Permission.findByPk(req.params.id);
    if (!permission) {
      return res.status(404).json({ error: 'Permission not found' });
    }
    res.json(permission);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve permission' });
  }
};

exports.updatePermission = async (req, res) => {
  try {
    const permission = await Permission.findByPk(req.params.id);
    if (!permission) {
      return res.status(404).json({ error: 'Permission not found' });
    }
    await permission.update(req.body);
    res.json(permission);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update permission' });
  }
};

exports.deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findByPk(req.params.id);
    if (!permission) {
      return res.status(404).json({ error: 'Permission not found' });
    }
    await permission.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete permission' });
  }
};
