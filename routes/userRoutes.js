const express = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const router = express.Router();

router.get('/', authenticate,authorize('VIEW_USER'), userController.getUsers);
router.get('/:id', authenticate, authorize('VIEW_USER'), userController.getUserById);
router.put('/:id', authenticate, authorize('EDIT_USER'), userController.updateUser);
router.delete('/:id', authenticate, authorize('DELETE_USER'), userController.deleteUser);
router.put('/:id/roles', authenticate, authorize('EDIT_USER_ROLES'), userController.updateUserRoles);

module.exports = router;
