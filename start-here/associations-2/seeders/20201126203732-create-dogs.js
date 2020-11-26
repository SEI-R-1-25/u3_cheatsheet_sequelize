'use strict'
'use strict'
const faker = require('faker')
const { User, sequelize } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let arr = [...Array(50)]
    const dogs = await Promise.all(
      arr.map(async (_) => {
        let user = await User.findOne({
          order: sequelize.random(),
          raw: true
        })
        return {
          breed: faker.lorem.word(),
          age: faker.random.number({ min: 0, max: 15 }),
          user_id: user.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    )
    await queryInterface.bulkInsert('dogs', dogs)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('dogs')
  }
}
