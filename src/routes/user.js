const router = require('express').Router();

const UserController = require("../controllers/UserController.js");
const UserMiddleware = require("../middlewares/UserMiddleware.js");

router.post("/user/signup", UserMiddleware.validateSignup, UserController.signUp);
router.post("/user/signin", UserMiddleware.validateSignin, UserController.signIn);
router.put("/user/resetpassword", UserMiddleware.validateResetPassword, UserController.resetPassword);

module.exports = router;