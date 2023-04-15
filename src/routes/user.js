const router = require('express').Router();

const UserController = require("../controllers/UserController.js");
const UserMiddleware = require("../middlewares/UserMiddleware.js");

router.post("/signup", UserMiddleware.validateSignup, UserController.signUp);
router.post("/signin", UserMiddleware.validateSignin, UserController.signIn);
router.put("/resetpassword", UserMiddleware.validateResetPassword, UserController.resetPassword);

module.exports = router;