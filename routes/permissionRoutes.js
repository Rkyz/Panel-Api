const express = require('express');
const permissionController = require('../controllers/permissionController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const router = express.Router();

router.post('/', authenticate, authorize('ADD_PERMISSION'), permissionController.createPermission);
router.get('/', authenticate, permissionController.getPermissions);
router.get('/:id', authenticate, authorize('VIEW_PERMISSION'), permissionController.getPermission);
router.put('/:id', authenticate, authorize('EDIT_PERMISSION'), permissionController.updatePermission);
router.delete('/:id', authenticate, authorize('DELETE_PERMISSION'), permissionController.deletePermission);

module.exports = router;
