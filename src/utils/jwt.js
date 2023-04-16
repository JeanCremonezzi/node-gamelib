require('dotenv').config();
const jwt = require("jsonwebtoken");

exports.generateToken = (obj) => {
    return jwt.sign({
        id: obj.id,
        username: obj.username,
        email: obj.email
    }, process.env.JWT_SECRET)
}

exports.decode = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}