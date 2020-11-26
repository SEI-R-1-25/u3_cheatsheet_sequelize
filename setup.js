const { readdirSync } = require('fs')
const { exec } = require('child_process')
const { promisify } = require('util')
const execute = promisify(exec)
const base_dir = readdirSync(__dirname).find((f) => f.includes('start'))

const working_dirs = readdirSync(`${__dirname}/${base_dir}`)
let starter = `${__dirname}/${base_dir}`
Promise.all(
  working_dirs.map(async (dir) => {
    try {
      await execute(
        ` cd ${starter}/${dir} && sequelize db:create && sequelize db:migrate && sequelize db:seed:all && cd ../`
      )
    } catch (error) {
      console.log(error)
    }
  })
)
