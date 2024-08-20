const express = require('express');
const authController = require('../controllers/auth/authController');
const router = express.Router();
const maxRoleUse = require('../middlewares/roleMax');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const path = require('path');

// Register a new user
router.post('/register', maxRoleUse, authController.register);

// Login a user
router.post('/login', authController.login);

router.use('/token',authController.getToken)

module.exports = router;
