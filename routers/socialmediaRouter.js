const express = require('express');
const router = express.Router();
const socialmediaController = require('../controllers/socialmediaController');
const authentication = require('../middleware/authentication');
const authorizationSocialmedia = require('../middleware/authorizationSocialmedia');

router.use(authentication);
router.post('/socialmedias', socialmediaController.createSocialMedia);
router.get('/socialmedias', socialmediaController.getSocialMedia);
router.put('/socialmedias/:socialMediaId', authorizationSocialmedia, socialmediaController.editSocialMedia);
router.delete('/socialmedias/:socialMediaId', authorizationSocialmedia, socialmediaController.deleteSocialMedia);

module.exports = router;