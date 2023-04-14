const router = require('express').Router();

const GamesController = require("../controllers/GamesController.js");

router.get("/games", GamesController.getByName);
router.get("/games/:id", GamesController.getById);

module.exports = router;