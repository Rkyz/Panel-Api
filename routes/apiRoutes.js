const express = require('express');
const apiController = require('../controllers/apiController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const router = express.Router();

router.get('/apis', authenticate, authorize('VIEW_API'), apiController.getApi);
router.get('/apis/:id', authenticate, authorize('VIEW_API'), apiController.getApiById);
router.post('/apis', authenticate, authorize('ADD_API'), apiController.createApi);
router.put('/apis/:id', authenticate, authorize('EDIT_API'), apiController.updateApi);
router.delete('/apis/:id', authenticate, authorize('DELETE_API'), apiController.deleteApi);

module.exports = router;
