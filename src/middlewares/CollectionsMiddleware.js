const models = require("../database/models/index.js");
const { jsonIsValid, fieldsAreValid } = require("../utils/jsonValidator.js");

exports.validateAddGame = async (req, res, next) => {
    const data = {...req.body};

    if (!jsonIsValid(data, ["gameId", "gameName", "platform", "yearPlayed"])) {
        return res.status(400).json({
            "error": "Invalid JSON format.",
            "message": "Request body must have gameId, gameName, platform and yearPlayed fields."
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
            gameId: data.gameId,
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

exports.validateRemoveGame = async (req, res, next) => {
    const data = {...req.body};
    const game = req.params.id;

    const gameInCollection = await models.GamesCollections.count({
        where: {
            gameId: game,
            user: data.userData.id
        }
    });

    if (gameInCollection == 0) {
        return res.status(404).json({
            "error": "Game not found.",
            "message": "This game isn't in user's collection."
        });        
    }

    next();
}

exports.validateUpdateGame = async (req, res, next) => {
    const data = {...req.body};

    if (!jsonIsValid(data, ["gameId", "gameName", "platform", "yearPlayed", "hoursPlayed"])) {
        return res.status(400).json({
            "error": "Invalid JSON format.",
            "message": "Request body must have gameId, gameName, platform, yearPlayed and hoursPlayed fields."
        });
    }

    if (!fieldsAreValid(data)) {
        return res.status(400).json({
            "error": "One or more fields are null or empty.",
            "message": "Game, platform, yearPlayed and hoursPlayed fields must be provided."
        });
    }

    const gameInCollection = await models.GamesCollections.count({
        where: {
            gameId: data.gameId,
            user: data.userData.id
        }
    });

    if (gameInCollection == 0) {
        return res.status(404).json({
            "error": "Game not found.",
            "message": "This game isn't in user's collection."
        });        
    }

    next();
}