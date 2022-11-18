const { User } = require('../models');
const { comparePassword } = require('../helper/bcrypt');
const { generateToken } = require('../helper/jwt');

class userController {
    static async register(req, res) {
        try {
            const { email, full_name, username, password, profile_image_url, age, phone_number } = req.body

            const data = await User.findAll();
            for (var key in data) {
                if (email == data[key].email) {
                    return res.status(500).json({
                        message: 'This email is already in use '
                    })
                }
            }
            for (var key in data) {
                if (username == data[key].username) {
                    return res.status(500).json({
                        message: 'This username is already in use '
                    })
                }
            }

            const user = await User.create(
                {
                    full_name,
                    email,
                    username,
                    password,
                    profile_image_url,
                    age,
                    phone_number
                }
            );
            return res.status(201).json({
                user: {
                    email: user.dataValues.email,
                    full_name: user.dataValues.full_name,
                    username: user.dataValues.username,
                    profile_image_url: user.dataValues.profile_image_url,
                    age: user.dataValues.age,
                    phone_number: user.dataValues.phone_number
                }
            })
        } catch (error) {
            const errObj = {};
            error.errors.map(error => {
                errObj[error.path] = error.message;
            })
            return res.status(500).json(errObj);
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const dataLogin = await User.findOne({
                where: {
                    email: email
                }
            })

            if (dataLogin) {
                const isCorrect = comparePassword(password, dataLogin.password);
                if (isCorrect) {
                    const token = generateToken({
                        id: dataLogin.id,
                    })
                    return res.status(200).json({ token: token })
                } else {
                    return res.status(500).json({ message: 'Wrong password' })
                }
            } else {
                return res.status(500).json({ message: 'Data not found' })
            }
        } catch (error) {
            const errObj = {};
            error.errors.map(error => {
                errObj[error.path] = error.message;
            })
            return res.status(500).json(errObj);
        }
    }

    static async editUser(req, res) {
        try {
            const userId = req.params.userId;
            const { email, full_name, username, profile_image_url, age, phone_number } = req.body;

            const data = await User.findAll();
            for (var key in data) {
                if (email == data[key].email) {
                    return res.status(500).json({
                        message: 'This email is already in use '
                    })
                }
            }
            for (var key in data) {
                if (username == data[key].username) {
                    return res.status(500).json({
                        message: 'This username is already in use '
                    })
                }
            }

            await User.update({ email, full_name, username, profile_image_url, age, phone_number }, { where: { id: userId } })
            const user = await User.findOne({ where: { id: userId }, attributes: { exclude: ['id', 'password', 'createdAt', 'updatedAt'] } });

            return res.status(200).json({ user })
        } catch (error) {
            return res.status(200).json(error);
        }
    }

    static async deleteUser(req, res) {
        try {
            const userId = req.params.userId;
            await User.destroy({ where: { id: userId } })
            return res.status(200).json({ message: 'Your account has been succesfully deleted' })
        } catch (error) {
            return res.status(200).json(error);
        }
    }
}

module.exports = userController;