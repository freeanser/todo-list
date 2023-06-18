const mongoose = require('mongoose')
const Todo = require('../todo')

// 僅在非正式環境時，使用dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// 將 connect 的結果，儲存下來
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
// once ：一次性的。只要成功open,就移除此監聽器
db.once('open', () => {
  console.log('mongobd connected')
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` })
  }
  console.log('done')
})