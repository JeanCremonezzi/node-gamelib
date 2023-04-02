import express from 'express';
const router = express.Router();

router.post("/user/signup", (req, res) => {
    // TODO
    res.send("Signup Endpoint");
})

router.get("/user/signin", (req, res) => {
    // TODO
    res.send("Signin Endpoint");
})

router.put("/user/resetpassword", (req, res) => {
    // TODO
    res.send("Resetpassword Endpoint");
})

export { router };