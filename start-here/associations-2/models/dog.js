'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Dog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Dog.belongsTo(models.User, {
        //One To Many
        foreignKey: 'user_id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    }
  }
  Dog.init(
    {
      breed: DataTypes.TEXT,
      age: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0
        },
        get(value) {
          let v = this.getDataValue(value)
          let ageLog = Math.log(v) * 16
          let humanAge = this.getDataValue(value)

          return {
            humanAge: humanAge,
            dogAge: Math.round(ageLog + 31)
          }
        },
        set(value) {
          return this.setDataValue('age', Math.round(value))
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        field: 'user_id', //Setting field custom value, sequelize creates a pascal cased column, ex: UserId
        references: {
          model: 'users',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Dog',
      tableName: 'dogs'
    }
  )
  return Dog
}
