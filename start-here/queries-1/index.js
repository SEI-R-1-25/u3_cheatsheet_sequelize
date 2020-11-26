const { Op, QueryTypes } = require('sequelize')
const { User, sequelize } = require('./models')

function stringer(arr) {
  console.log(JSON.stringify(arr, null, 4))
}

const getAll = async () => {
  const users = await User.findAll()
  stringer(users)
}

const getAllLimit = async () => {
  const users = await User.findAll({ limit: 10 })
  stringer(users)
}

const getWhere = async () => {
  const users = await User.findAll({ where: { id: 7 } })
  stringer(users)
}

const getOne = async () => {
  const users = await User.findOne({ where: { id: 2 } })
  stringer(users)
}

const getOnlyAttributes = async () => {
  const users = await User.findAll({ attributes: ['id', 'name'] })
  stringer(users)
}

const orderData = async () => {
  const users = await User.findAll({ order: [['id', 'DESC']] }) //ASC for asecnding
  stringer(users)
}

const findById = async () => {
  const users = await User.findByPk(1)
  stringer(users)
}

const orOperators = async () => {
  const users = await User.findAll({
    where: { [Op.or]: [{ id: 2 }, { id: 3 }] }
  })
  stringer(users)
}

const andOperators = async () => {
  // Querying where and like
  const users = await User.findAll({
    where: {
      [Op.and]: [{ id: 3 }, { name: { [Op.like]: '%Lance%' } }]
    }
  })
  stringer(users)
}

const rawQuery = async () => {
  const users = await sequelize.query('SELECT * FROM users WHERE id = 10', {
    type: QueryTypes.SELECT
  })
  stringer(users)
}

const createUser = async () => {
  const user = await User.create({
    name: 'Foo',
    email: 'Bar',
    password: '1234'
  })
  stringer(user)
}

const updateUser = async () => {
  const user = await User.update(
    { name: 'Foo Bar' },
    { where: { id: 21 }, returning: true }
  )
  stringer(user)
}

const deleteUser = async () => {
  await User.destroy({ where: { id: 21 } })
}

async function run() {
  try {
    await getAll()
    await getAllLimit()
    await getWhere()
    await getOne()
    await getOnlyAttributes()
    await orderData()
    await findById()
    await orOperators()
    await andOperators()
    await rawQuery()
    await createUser()
    await updateUser()
    await deleteUser()
  } catch (error) {
    console.log(error)
  } finally {
    process.exit()
  }
}
run()
