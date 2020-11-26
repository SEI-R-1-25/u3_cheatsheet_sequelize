'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UserFavorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserFavorite.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      movieId: {
        type: DataTypes.INTEGER,
        field: 'movie_id',
        references: {
          model: 'movies',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'UserFavorite',
      tableName: 'user_favorites'
    }
  )
  return UserFavorite
}
