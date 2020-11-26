const { User, Movie, UserFavorite, sequelize } = require('./models')
function stringer(arr) {
  console.log(JSON.stringify(arr, null, 4))
}
const getUserFavs = async () => {
  const users = await User.findAll({ include: [Movie] })
  stringer(users)
}

const insertFavoriteUsingSetter = async () => {
  const user = await User.findByPk(67)
  const movie = await Movie.findOne({ order: sequelize.random() })
  user.setMovies(movie)
  let userAndNewFave = await User.findByPk(3, {
    include: [Movie]
  })
  stringer(userAndNewFave)
}

const insertUserFavoriteUsingIds = async () => {
  const user = await User.findByPk(67)
  const movie = await Movie.findOne({ order: sequelize.random() })
  let fav = await UserFavorite.create({
    user_id: user.dataValues.id,
    movie_id: movie.dataValues.id
  })
  stringer(fav)
}

getUserFavs()
async function run() {
  try {
    await getUserFavs()
    await insertFavoriteUsingSetter()
    await insertUserFavoriteUsingIds()
  } catch (error) {
    console.log(error)
  } finally {
    process.exit()
  }
}

run()
