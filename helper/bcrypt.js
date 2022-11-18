const bcrypt = require('bcrypt');

function hashPassword(userPassword) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(userPassword, salt);
    return hashedPassword;
}

function comparePassword(userPassword, hashedPassword) {
    return bcrypt.compareSync(userPassword, hashedPassword);
}

module.exports = { hashPassword, comparePassword }