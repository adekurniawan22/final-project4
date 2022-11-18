const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');
const authentication = require('../middleware/authentication');
const authorizationPhoto = require('../middleware/authorizationPhoto');

router.use(authentication);
router.post('/photos', photoController.createPhoto);
router.get('/photos', photoController.getPhoto);
router.put('/photos/:photoId', authorizationPhoto, photoController.editPhoto);
router.delete('/photos/:photoId', authorizationPhoto, photoController.deletePhoto);

module.exports = router;