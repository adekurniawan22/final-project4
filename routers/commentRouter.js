const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authentication = require('../middleware/authentication');
const authorizationComment = require('../middleware/authorizationComment');

router.use(authentication);
router.post('/comments', commentController.createComment);
router.get('/comments', commentController.getComment);
router.put('/comments/:commentId', authorizationComment, commentController.editComment);
router.delete('/comments/:commentId', authorizationComment, commentController.deleteComment);

module.exports = router;