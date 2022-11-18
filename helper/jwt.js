const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE } = process.env;

function generateToken(payload) {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
    return token;
}

function verifyToken(token) {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
}

module.exports = { generateToken, verifyToken }