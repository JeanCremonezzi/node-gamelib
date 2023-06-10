'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GamesCollections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.User);
    }
  }
  GamesCollections.init({
    gameId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    user: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    gameName:  DataTypes.STRING,
    yearPlayed: DataTypes.INTEGER,
    hoursPlayed: DataTypes.INTEGER,
    platform: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GamesCollections',
  });
  return GamesCollections;
};