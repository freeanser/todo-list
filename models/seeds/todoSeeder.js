
const db = require('../../config/mongoose')
const Todo = require('../todo')


// 留下跟 mongoose.js 不同的部分
db.once('open', () => {
  console.log('mongobd connected')
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` })
  }
  console.log('done')
})