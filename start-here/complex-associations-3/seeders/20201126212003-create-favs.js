'use strict'
const { User, Movie, sequelize } = require('../models')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const favs = await Promise.all(
      [...Array(80)].map(async (_) => {
        let user = await User.findOne({ order: sequelize.random(), raw: true })
        let movie = await Movie.findOne({
          order: sequelize.random(),
          raw: true
        })
        return {
          user_id: user.id,
          movie_id: movie.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    )
    await queryInterface.bulkInsert('user_favorites', favs)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_favorites')
  }
}
