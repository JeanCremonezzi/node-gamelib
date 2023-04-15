const jwt = require("jsonwebtoken");

exports.generateToken = (obj) => {
    return jwt.sign({
        id: obj.id,
        username: obj.username,
        email: obj.email
    }, 'secret')
}

exports.decode = (token) => {
    return jwt.verify(token, 'secret');
}