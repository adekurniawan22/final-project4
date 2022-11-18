const { User } = require('../models');
const { verifyToken } = require('../helper/jwt');

async function authentication(req, res, next) {
    try {
        const token = req.headers.authorization;
        const userDecoded = verifyToken(token);

        const user = await User.findOne({
            where: {
                id: userDecoded.id
            }
        })

        if (user) {
            res.authentication = user;
            next();
        } else {
            return res.status(500).json({ message: 'Wrong token' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = authentication