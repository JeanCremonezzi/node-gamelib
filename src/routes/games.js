import express from 'express';
const router = express.Router();
import axios from "axios";

// Get games from API by name
router.get("/games", (req, res) => {
    axios({
        method: "POST",
        url: `${process.env.API_URL}/games`,
        headers: {
            'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
            'Client-ID': process.env.CLIENT_ID
        },
        data: `search "${req.query.name}"; fields name; limit 30;`
    })
    .then((apiRes) => {
        res.send(apiRes.data);
    })
})

export { router };