const router = require('express').Router();

const GamesController = require("../controllers/GamesController.js");

router.get("/", GamesController.getByName);
router.get("/:id", GamesController.getById);

module.exports = router;