const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10);
exports.hashPassword = (plainText) => bcrypt.hashSync(plainText, salt);
exports.checkPassword = async (plainText, hash) => await bcrypt.compare(plainText, hash);