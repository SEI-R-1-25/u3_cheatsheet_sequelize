'use strict'
const faker = require('faker')

const posts = [...Array(10)].map((user) => ({
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraph(),
  createdAt: new Date(),
  updatedAt: new Date()
}))
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('posts', posts)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('posts')
  }
}
