'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.review.belongsTo(models.user)
      models.review.belongsTo(models.anime)
      models.review.hasMany(models.comment)
    }
  }
  review.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    animeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'review',
  });
  return review;
};