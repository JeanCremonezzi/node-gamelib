const router = require('express').Router();

router.get("/:id", (req, res) => res.send("GET USER COLLECTION"));
router.post("/", (req, res) => res.send("ADD TO COLLECTION"));
router.delete("/", (req, res) => res.send("REMOVE FROM COLLECTION"));
router.put("/", (req, res) => res.send("UPDATE FROM COLLECTION"));

module.exports = router;