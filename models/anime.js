'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class anime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.anime.hasMany(models.review)
      models.anime.belongsToMany(models.user, {through: 'userFavAnime'})
    }
  }
  anime.init({
    aniListId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'anime',
  });
  return anime;
};