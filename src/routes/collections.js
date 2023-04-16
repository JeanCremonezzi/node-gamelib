const router = require('express').Router();

const CollectionsController = require("../controllers/CollectionsController.js");
const CollectionsMiddleware = require("../middlewares/CollectionsMiddleware.js");

router.get("/", CollectionsController.userCollection);
router.post("/", CollectionsMiddleware.validateAddGame, CollectionsController.addToCollection);
router.delete("/:id", CollectionsMiddleware.validateRemoveGame, CollectionsController.removeFromCollection);
router.put("/", CollectionsMiddleware.validateUpdateGame, CollectionsController.updateFromCollection);

module.exports = router;