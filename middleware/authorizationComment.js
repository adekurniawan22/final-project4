const { Comment } = require('../models/')

async function authorizationComment(req, res, next) {
    try {
        const commentId = parseInt(req.params.commentId);
        const dataComment = await Comment.findOne({ where: { id: commentId } })
        if (res.authentication.id == dataComment.UserId) {
            next();
        } else {
            return res.status(401).json({ message: 'Forbidden' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = authorizationComment