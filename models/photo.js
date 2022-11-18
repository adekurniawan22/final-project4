'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User);
      this.hasMany(models.Comment)
    }
  }
  Photo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    },
    caption: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    },
    poster_image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isUrl: true
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};