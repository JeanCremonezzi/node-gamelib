const router = require('express').Router();

const gamesModule = require("./games.js");
const userModule = require("./user.js");

router.use(gamesModule);
router.use(userModule);

module.exports = router;