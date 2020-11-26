'use strict'
const faker = require('faker')

const users = [...Array(10)].map((user) => ({
  name: faker.internet.userName(),
  email: faker.internet.email(),
  createdAt: new Date(),
  updatedAt: new Date()
}))
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', users)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users')
  }
}
