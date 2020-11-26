'use strict'
const faker = require('faker')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const movies = [...Array(100)].map((_) => ({
      title: faker.company.companyName(),
      rating: faker.random.number({ min: 10, max: 100 }),
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    await queryInterface.bulkInsert('movies', movies)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('movies')
  }
}
