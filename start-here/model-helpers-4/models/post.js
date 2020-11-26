'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        get(value) {
          console.log()
          let title = this.getDataValue(value) + ' U+1F600'
          return title
        },
        set(value) {
          return this.setDataValue('title', `${value} U+1F604`)
        }
      },
      content: DataTypes.TEXT,
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0, // set default to 0
        allowNull: false, // do not allow null fields
        validate: {
          isInt: true,
          min: 0 // validation to ensure our field never goes below 0
        }
      }
    },
    {
      sequelize,
      modelName: 'Post',
      tableName: 'posts' // Name your tables correctly, always lowercased and snake cased
    }
  )
  return Post
}
