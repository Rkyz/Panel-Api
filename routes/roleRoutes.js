const express = require('express');
const roleController = require('../controllers/roleController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const router = express.Router();

// Create a new role
router.post('/', authenticate, roleController.createRole);

// Get all roles
router.get('/', authenticate, authorize('VIEW_ROLE'), roleController.getRoles);

// Get a specific role by ID
router.get('/:id', authenticate, authorize('VIEW_ROLE1'), roleController.getRole);

// Update a specific role by ID
router.put('/:id', authenticate, authorize('EDIT_ROLE'), roleController.updateRole);

// Delete a specific role by ID
router.delete('/:id', authenticate, authorize('DELETE_ROLE'), roleController.deleteRole);

module.exports = router;
