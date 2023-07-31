const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Todo = require('../todo')
const User = require('../user')
const db = require('../../config/mongoose')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}
db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: 10 }, // 生成 ['', '', '', ....., ''] 內有空物件的十個陣列，然後再把這十個東西拿出來輪流執行 
        (_, i) => Todo.create({ name: `name-${i}`, userId }) // 用不到的地方，用 _ 代表
      ))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})
