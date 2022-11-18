const { SocialMedia } = require('../models/')

async function authorizationSocialmedia(req, res, next) {
    try {
        const socialMediaId = parseInt(req.params.socialMediaId);
        const dataSocialMedia = await SocialMedia.findOne({ where: { id: socialMediaId } })
        if (res.authentication.id == dataSocialMedia.UserId) {
            next();
        } else {
            return res.status(401).json({ message: 'Forbidden' })
        }
    } catch (error) {
        return res.status(200).json(error);
    }
}

module.exports = authorizationSocialmedia