import express from 'express';
const router = express.Router();
import axios from "axios";

const FIELDS = `fields name, platforms.name, cover.image_id, release_dates.human, platforms.name, platforms.platform_logo.image_id;
                where category = (0, 4, 6, 8, 9, 10, 11);  
                limit 16;`;

/** Get API games by name */
router.get("/games", (req, res) => {
    axios({
        method: "POST",
        url: `${process.env.API_URL}/games`,
        headers: {
            'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
            'Client-ID': process.env.CLIENT_ID
        },
        data:  `search "${req.query.name}"; 
                ${FIELDS}
                where category = (0, 3, 4, 6, 8, 9, 10, 11);`
    })
    .then((apiRes) => {
        res.send(transformData(apiRes.data));
    })
})

/** Get API games by id */
router.get("/games/:id", (req, res) => {
    axios({
        method: "POST",
        url: `${process.env.API_URL}/games`,
        headers: {
            'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
            'Client-ID': process.env.CLIENT_ID
        },
        data:  `${FIELDS} 
                where id = ${req.params.id};`
    })
    .then((apiRes) => {
        res.send(transformData(apiRes.data));
    })
})

const transformData = (data) => {
    let formatted = [];

    if (data.length > 0) {
        formatted = data.map((item) => {
            return {
                "id": item.id,
                "category": item.category,
                "name": item.name,
                "initial_release": item.release_dates == null ? "N/A" : item.release_dates[0].human.slice(-4),
                "cover": item.cover != null ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${item.cover.image_id}.jpg` : null,
                "platforms": item.platforms == null ? [] : item.platforms.map((platform) => {
                    return {
                        "id": platform.id,
                        "name": platform.name,
                        "logo": platform.platform_logo == null ? null : {
                            "logo_url": platform.platform_logo.image_id != null ? `https://images.igdb.com/igdb/image/upload/t_logo_med/${platform.platform_logo.image_id}.jpg` : null,
                        }
                    }
                })
            }
        })
    }

    return formatted;
}

export { router };