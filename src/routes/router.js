const router = require('express').Router();

const gamesModule = require("./games.js");
const userModule = require("./user.js");
const collectionsModule = require("./collections.js");

const CookieMiddleware = require("../middlewares/CookieMiddleware.js");

router.use("/games", gamesModule);
router.use("/user", userModule);
router.use("/collections", CookieMiddleware.validateCookie, collectionsModule);

module.exports = router;