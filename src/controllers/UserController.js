const models = require("../database/models/index.js");

exports.signUp = async (req, res) => {
    const data = {...req.body};

    await models.User.create({
        username: data.username,
        email: data.email,
        password: data.password
    });

    res.send("User Created");
}

exports.signIn = async (req, res) => {
    const data = {...req.body};

    const user = await models.User.findAll({
        where: {
            email: data.email
        },
        attributes: ["id", "username", "email", "password"]
    });

    res.send(user[0]);
}

exports.resetPassword = async (req, res) => {
    const data = {...req.body};

    await models.User.update({password: data.newPassword}, {
        where: {
            id: data.id
        }
    });

    res.send("Password reset");
}