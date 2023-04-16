const models = require("../database/models/index.js");

exports.userCollection = async (req, res) => {
    const data = {...req.body};

    await models.GamesCollections.findAll({
        raw: true,
        where: {
            user: data.userData.id,
        },
        attributes: ["game", "platform", "yearPlayed", "hoursPlayed"]
    }).then((resultEntity) => {
        res.status(200).json(resultEntity);
    });
}

exports.addToCollection = async (req, res) => {
    const data = {...req.body};

    await models.GamesCollections.create({
        game: data.game,
        user: data.userData.id,
        platform: data.platform,
        yearPlayed: data.yearPlayed,
        hoursPlayed: data.hoursPlayed || 0,

    }).then(() => {
        res.status(200).json({message: "Game added to collection."});
    });
}

exports.removeFromCollection = async (req, res) => {
    res.send("REMOVE FROM COLLECTION");
}

exports.updateFromCollection = async (req, res) => {
    res.send("UPDATE FROM COLLECTION");
}