'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userFavAnime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userFavAnime.init({
    userId: DataTypes.INTEGER,
    animeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userFavAnime',
  });
  return userFavAnime;
};