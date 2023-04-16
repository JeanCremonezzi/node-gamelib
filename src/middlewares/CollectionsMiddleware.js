const models = require("../database/models/index.js");
const { jsonIsValid, fieldsAreValid } = require("../utils/jsonValidator.js");

exports.validateAddGame = async (req, res, next) => {
    const data = {...req.body};

    if (!jsonIsValid(data, ["game", "platform", "yearPlayed"])) {
        return res.status(400).json({
            "error": "Invalid JSON format.",
            "message": "Request body must have game, platform and yearPlayed fields."
        });
    }

    if (!fieldsAreValid(data)) {
        return res.status(400).json({
            "error": "One or more fields are null or empty.",
            "message": "Game, platform and yearPlayed fields must be provided."
        });
    }

    const gameInCollection = await models.GamesCollections.count({
        where: {
            game: data.game,
            user: data.userData.id
        }
    });

    if (gameInCollection != 0) {
        return res.status(409).json({
            "error": "Already in collection.",
            "message": "This game is already in the user's collection."
        });        
    }

    next();
}