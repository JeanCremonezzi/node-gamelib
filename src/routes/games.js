const router = require('express').Router();

const gamesController = require("../controllers/GamesController.js");

router.get("/games", gamesController.getByName);
router.get("/games/:id", gamesController.getById);

module.exports = router;