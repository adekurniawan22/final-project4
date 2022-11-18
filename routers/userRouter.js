const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authentication = require('../middleware/authentication');
const authorizationUser = require('../middleware/authorizationUser');

router.post('/users/register', userController.register);
router.post('/users/login', userController.login);
router.use(authentication)
router.put('/users/:userId', authorizationUser, userController.editUser);
router.delete('/users/:userId', authorizationUser, userController.deleteUser);

module.exports = router;