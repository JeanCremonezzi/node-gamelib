const models = require("../database/models/index.js");
const bcrypt = require("../utils/BCrypt.js");

exports.signUp = async (req, res) => {
    const data = {...req.body};

    await models.User.create({
        username: data.username,
        email: data.email,
        password: bcrypt.hashPassword(data.password)
    });

    res.send("User Created");
}

exports.signIn = async (req, res) => {
    const data = {...req.body};

    const user = await models.User.findOne({
        raw: true,
        where: {
            email: data.email
        },
        attributes: ["id", "username", "email", "password"]
    });

    res.send(user);
}

exports.resetPassword = async (req, res) => {
    const data = {...req.body};

    await models.User.update({password: bcrypt.hashPassword(data.newPassword)}, {
        where: {
            id: data.id
        }
    });

    res.send("Password reset");
}