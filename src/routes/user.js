const router = require('express').Router();

const UserController = require("../controllers/UserController.js");

router.post("/user/signup", UserController.signUp);
router.post("/user/signin", UserController.signIn);
router.put("/user/resetpassword", UserController.resetPassword);

module.exports = router;