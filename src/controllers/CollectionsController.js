const models = require("../database/models/index.js");

exports.userCollection = async (req, res) => {
    const data = {...req.body};

    await models.GamesCollections.findAll({
        raw: true,
        where: {
            user: data.userData.id,
        },
        attributes: ["gameId", "gameName", "platform", "yearPlayed", "hoursPlayed"]
    }).then((resultEntity) => {
        res.status(200).json(resultEntity);
    });
}

exports.addToCollection = async (req, res) => {
    const data = {...req.body};

    await models.GamesCollections.create({
        gameId: data.gameId,
        gameName: data.gameName,
        user: data.userData.id,
        platform: data.platform,
        yearPlayed: data.yearPlayed,
        hoursPlayed: data.hoursPlayed || 0,

    }).then(() => {
        res.status(200).json({message: "Game added to collection."});
    });
}

exports.removeFromCollection = async (req, res) => {
    const data = {...req.body};
    const game = req.params.id;

    await models.GamesCollections.destroy({
        where: {
            gameId: game,
            user: data.userData.id
        }
    }).then(() => {
        res.status(200).json({message: "Game removed from collection."});
    });

}

exports.updateFromCollection = async (req, res) => {
    const data = {...req.body};

    await models.GamesCollections.update({
        platform: data.platform,
        yearPlayed: data.yearPlayed,
        hoursPlayed: data.hoursPlayed,
    },{
        where: {
            gameId: data.gameId,
            user: data.userData.id
        }
    }).then(() => {
        res.status(200).json({message: "Game updated in collection."});
    });
}