const models = require("../database/models/index.js");
const {decode} = require("../utils/jwt.js");

exports.validateCookie = async (req, res, next) => {
    if (!req.cookies.signin_token) {
        return res.status(400).json({
            "error": "Missing cookie.",
            "message": "A necessary cookie is missing."
        });
    }

    const decodedToken = decode(req.cookies.signin_token)
    const userById = await models.User.findOne({
        raw: true,
        where: {
            id: decodedToken.id
        },
        attributes: ["password", "email", "username", "id"]
    });

    if (!userById) {
        return res.status(401).json({
            "error": "User not found.",
            "message": "User id not found."
        });
    }

    req.body.userData = {
        ...userById
    }

    next();
}