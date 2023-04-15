const router = require('express').Router();

const gamesModule = require("./games.js");
const userModule = require("./user.js");

router.use("/games", gamesModule);
router.use("/user", userModule);

module.exports = router;