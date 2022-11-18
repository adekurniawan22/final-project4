const { Photo } = require('../models/')

async function authorizationPhoto(req, res, next) {
    try {
        const photoId = parseInt(req.params.photoId);
        const dataPhoto = await Photo.findOne({ where: { id: photoId } })
        if (res.authentication.id == dataPhoto.UserId) {
            next();
        } else {
            return res.status(401).json({ message: 'Forbidden' })
        }
    } catch (error) {
        return res.status(200).json(error);
    }
}

module.exports = authorizationPhoto