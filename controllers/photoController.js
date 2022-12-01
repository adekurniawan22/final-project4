const { Photo, Comment, User } = require('../models/')

class photoController {
    static async createPhoto(req, res) {
        try {
            const { poster_image_url, title, caption } = req.body;
            const data = await Photo.create({
                poster_image_url, title, caption, UserId: res.authentication.id
            })
            return res.status(201).json({
                id: data.dataValues.id,
                poster_image_url: data.dataValues.poster_image_url,
                title: data.dataValues.title,
                caption: data.dataValues.caption,
                UserId: data.dataValues.UserId
            })
        } catch (error) {
            const errObj = {};
            error.errors.map(error => {
                errObj[error.path] = error.message;
            })
            return res.status(500).json({ message: errObj });
        }
    }

    static async getPhoto(req, res) {
        try {
            const data = await Photo.findAll({
                include: [
                    {
                        model: Comment,
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                        include: [{ model: User, attributes: ["username"] }],
                    },
                    {
                        model: User,
                        attributes: { exclude: ['createdAt', 'updatedAt', 'full_name', 'email', 'age', 'phone_number', 'password'] }
                    }]
            })
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async editPhoto(req, res) {
        try {
            const { title, caption, poster_image_url } = req.body;
            await Photo.update(
                {
                    title, caption, poster_image_url
                },
                {
                    where: { id: req.params.photoId }
                })

            const dataUpdate = await Photo.findOne({ where: { id: req.params.photoId } })
            return res.status(200).json({ photo: dataUpdate })
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async deletePhoto(req, res) {
        try {
            await Photo.destroy({ where: { id: req.params.photoId } })
            return res.status(200).json({ message: 'Your photo has been successfully deleted' })
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = photoController