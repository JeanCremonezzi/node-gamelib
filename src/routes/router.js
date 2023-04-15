const router = require('express').Router();

const gamesModule = require("./games.js");
const userModule = require("./user.js");
const collectionsModule = require("./collections.js");

router.use("/games", gamesModule);
router.use("/user", userModule);
router.use("/collections", collectionsModule);

module.exports = router;