const { Post } = require('./models')

function stringer(arr) {
  console.log(JSON.stringify(arr, null, 4))
}

const demoDefaultGetter = async () => {
  const post = await Post.findAll()
  stringer(post)
}

const demoDefaultSetter = async () => {
  const post = await Post.create({ title: 'Hi', content: 'Woo' })
  stringer(post)
}

async function run() {
  try {
    await demoDefaultGetter()
    await demoDefaultSetter()
  } catch (error) {
    console.log(error)
  } finally {
    process.exit()
  }
}

run()
