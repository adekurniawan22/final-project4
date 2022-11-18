const { SocialMedia, User } = require('../models/')

class socialmediaController {
    static async createSocialMedia(req, res) {
        try {
            const { name, social_media_url } = req.body;
            const social_media = await SocialMedia.create({
                name, social_media_url, UserId: res.authentication.id
            })

            return res.status(201).json({ social_media })
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async getSocialMedia(req, res) {
        try {
            const data = await SocialMedia.findAll({
                where: {
                    UserId: res.authentication.id
                },
                include: [{
                    model: User,
                    attributes: ["id", "username", "profile_image_url"]
                }]
            })
            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async editSocialMedia(req, res) {
        try {
            const { name, social_media_url } = req.body;
            await SocialMedia.update({ name, social_media_url }, { where: { id: req.params.socialMediaId } });
            const dataUpdate = await SocialMedia.findOne({ where: { id: req.params.socialMediaId } })
            return res.status(200).json({ social_media: dataUpdate })
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async deleteSocialMedia(req, res) {
        try {
            await SocialMedia.destroy({ where: { id: req.params.socialMediaId } })
            return res.status(200).json({ message: 'Your social media has been succesfully deleted' })
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = socialmediaController;