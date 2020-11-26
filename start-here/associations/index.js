const { User, Dog } = require('./models')

function stringer(arr) {
  console.log(JSON.stringify(arr, null, 4))
}
const usersWithDogs = async () => {
  const users = await User.findAll({ include: [Dog] })
  stringer(users)
}

const dogsWithOwners = async () => {
  const dogs = await Dog.findAll({ include: [User] })
  stringer(dogs)
}

const excludeAssociationFields = async () => {
  const dogs = await Dog.findAll({
    include: [{ model: User, attributes: ['id', 'name'] }]
  })
  stringer(dogs)
}

async function run() {
  try {
    await usersWithDogs()
    await dogsWithOwners()
    await excludeAssociationFields()
  } catch (error) {
    console.log(error)
  } finally {
    process.exit()
  }
}

run()
