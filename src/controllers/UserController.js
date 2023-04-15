const models = require("../database/models/index.js");
const bcrypt = require("../utils/BCrypt.js");
const { generateToken } = require("../utils/jwt.js");

exports.signUp = async (req, res) => {
    const data = {...req.body};

    await models.User.create({
        username: data.username,
        email: data.email,
        password: bcrypt.hashPassword(data.password)

    }).then((resultEntity) => {
        const token = generateToken(resultEntity.get({plain:true}));

        res.status(200)
            .cookie("signin_token", token, {
                httpOnly: true
            })
            .json({message: "User successfully created."});
    });
}

exports.signIn = async (req, res) => {
    const data = {...req.body};

    await models.User.findOne({
        raw: true,
        where: {
            email: data.email
        },
        attributes: ["id", "username", "email"]
    
    }).then((resultEntity) => {
        const token = generateToken(resultEntity);

        res.status(200)
            .cookie("signin_token", token, {
                httpOnly: true
            })
            .json({message: "User authorized."});
    })
}

exports.resetPassword = async (req, res) => {
    const data = {...req.body};
    
    await models.User.update({password: bcrypt.hashPassword(data.newPassword)}, {
        where: {
            id: data.userData.id
        }
    }).then(() => {
        res.status(200).json({message: "Password changed."});
    });
}