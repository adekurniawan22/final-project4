async function authorizationUser(req, res, next) {
    try {
        const userId = req.params.userId;
        if (userId == res.authentication.id) {
            next();
        } else {
            return res.status(401).json({ message: 'Forbidden' })
        }
    } catch (error) {
        return res.status(200).json(error);
    }
}

module.exports = authorizationUser