const { User, Movie, UserFavorite, sequelize } = require('./models')
function stringer(arr) {
  console.log(JSON.stringify(arr, null, 4))
}
const getUserFavs = async () => {
  const users = await User.findAll({ include: [Movie] })
  stringer(users)
}

const getMoviesAndUsers = async () => {
  const movies = await Movie.findAll({ include: [User] })
  stringer(movies)
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

async function run() {
  try {
    await getUserFavs()
    await insertFavoriteUsingSetter()
    await insertUserFavoriteUsingIds()
    await getMoviesAndUsers()
  } catch (error) {
    console.log(error)
  } finally {
    process.exit()
  }
}

run()
