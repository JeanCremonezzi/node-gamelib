const models = require("../database/models/index.js");
const { emailIsValid } = require("../utils/emailValidator.js");
const { jsonIsValid, fieldsAreValid } = require("../utils/jsonValidator.js");
const bcrypt = require("../utils/BCrypt.js");

exports.validateSignup = async (req, res, next) => {
    const data = {...req.body};

    /** Checks if JSON object has the required fields */
    if (!jsonIsValid(data, ["username", "email", "password"])) {
        return res.status(400).json({
            "error": "Invalid JSON format.",
            "message": "Request body must have username, email and password fields."
        });
    }

    /** Checks JSON fields aren't null or empty */
    if (!fieldsAreValid(data)) {
        return res.status(400).json({
            "error": "One or more fields are null or empty.",
            "message": "Username, email and password fields must be provided."
        });
    }

    /** Checks if email is valid */
    if (!emailIsValid(data.email)) {
        return res.status(400).json({
            "error": "Invalid email.",
            "message": "Email format is invalid."
        });
    }

    /** Checks if email is already in use */
    const userByEmail = await models.User.findOne({
        raw: true,
        where: {
            email: data.email
        },
        attributes: ["email"]
    });
    if (userByEmail) {
        return res.status(409).json({
            "error": "Email in use.",
            "message": "The provided email is already registered."
        });
    }

    next();
};

exports.validateSignin = async (req, res, next) => {
    const data = {...req.body};

    /** Checks if JSON object has the required fields */
    if (!jsonIsValid(data, ["email", "password"])) {
        return res.status(400).json({
            "error": "Invalid JSON format.",
            "message": "Request body must have email and password fields."
        });
    }

    /** Checks JSON fields aren't null or empty */
    if (!fieldsAreValid(data)) {
        return res.status(400).json({
            "error": "One or more fields are null or empty.",
            "message": "Email and password fields must be provided."
        });
    }

    /** Checks if email is valid */
    if (!emailIsValid(data.email)) {
        return res.status(400).json({
            "error": "Invalid email.",
            "message": "Email format is invalid."
        });
    }

    /** Checks if email is registered and password is correct */
    const userByEmail = await models.User.findOne({
        raw: true,
        where: {
            email: data.email
        },
        attributes: ["email", "password"]
    });

    const match = await bcrypt.checkPassword(data.password, userByEmail.password);
    if (!userByEmail || !match) {
        return res.status(401).json({
            "error": "Wrong credentials",
            "message": "Invalid email or password."
        });

    }

    next();
}

exports.validateResetPassword = async (req, res, next) => {
    const data = {...req.body};

    /** Checks if JSON object has the required fields */
    if (!jsonIsValid(data, ["id", "newPassword"])) {
        return res.status(400).json({
            "error": "Invalid JSON format.",
            "message": "Request body must have id and newPassword fields."
        });
    }

    /** Checks JSON fields aren't null or empty */
    if (!fieldsAreValid(data)) {
        return res.status(400).json({
            "error": "One or more fields are null or empty.",
            "message": "id and newPassword fields must be provided."
        });
    }

    /** Checks if id is registered and password isn't the same */
    const userById = await models.User.findOne({
        raw: true,
        where: {
            id: data.id
        },
        attributes: ["password"]
    });

    const match = await bcrypt.checkPassword(data.newPassword, userById.password);
    if (!userById || match) {
        return res.status(401).json({
            "error": "User or password not found/invalid",
            "message": "User id not found or password not changed"
        });

    }

    next();
}