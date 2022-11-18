const { Comment, Photo, User } = require('../models/');

class commentController {
    static async createComment(req, res) {
        try {
            const { comment, PhotoId } = req.body;

            const checkPhoto = await Photo.findOne({ where: { id: PhotoId } });
            if (checkPhoto) {
                const newComment = await Comment.create({
                    UserId: res.authentication.id, PhotoId, comment
                })
                return res.status(201).json({ comment: newComment })
            } else {
                return res.status(500).json({ message: 'Photo id not found' })
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async getComment(req, res) {
        try {
            const data = await Comment.findAll({
                include: [
                    {
                        model: Photo,
                        attributes: { exclude: ['createdAt', 'updatedAt', 'UserId'] },
                    },
                    {
                        model: User,
                        attributes: { exclude: ['createdAt', 'updatedAt', 'full_name', 'email', 'age', 'password'] }
                    }]
            })
            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async editComment(req, res) {
        try {
            const comment = req.body.comment;
            await Comment.update({ comment }, { where: { id: req.params.commentId } });
            const dataUpdate = await Comment.findOne({ where: { id: req.params.commentId } })
            return res.status(200).json({ comment: dataUpdate })
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async deleteComment(req, res) {
        try {
            await Comment.destroy({ where: { id: req.params.commentId } })
            return res.status(200).json({ message: 'Your comment has been succesfully deleted' })
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = commentController