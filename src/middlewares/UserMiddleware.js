const models = require("../database/models/index.js");
const { emailIsValid } = require("../utils/emailValidator.js");

exports.validateSignup = async (req, res, next) => {
    const data = {...req.body};

    /** Checks if JSON object has the required fields */
    if (!data.hasOwnProperty("username") || !data.hasOwnProperty("email") || !data.hasOwnProperty("password")) {
        return res.status(400).json({
            "error": "Invalid JSON format.",
            "message": "Request body must have username, email and password fields."
        });
    }

    /** Checks JSON fields aren't null or empty */
    if (!data.username || !data.email || !data.password) {
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
        where: {
            email: data.email
        },
        attributes: ["email"]
    });
    if (userByEmail.length != 0) {
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
    if (!data.hasOwnProperty("email") || !data.hasOwnProperty("password")) {
        return res.status(400).json({
            "error": "Invalid JSON format.",
            "message": "Request body must have email and password fields."
        });
    }

    /** Checks JSON fields aren't null or empty */
    if (!data.email || !data.password) {
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

    const userByEmail = await models.User.findOne({
        where: {
            email: data.email
        },
        attributes: ["email", "password"]
    });
    if (!userByEmail || userByEmail.password != data.password) {
        return res.status(401).json({
            "error": "Wrong credentials",
            "message": "Invalid email or password."
        });

    }

    next();
}