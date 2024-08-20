const express = require('express');
const authRoutes = require('./authRoutes');
const roleRoutes = require('./roleRoutes');
const userRoutes = require('./userRoutes');
const permissionRoutes = require('./permissionRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/api/roles', roleRoutes);
router.use('/api/users', userRoutes);
router.use('/api/permissions', permissionRoutes);

module.exports = router;
