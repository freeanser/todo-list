const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const Todo = require('./models/todo')

// 引入 資源
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true })) // use：每一個require都需要來這裡; urlencoded：幫忙解析內容

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
})

app.get('/', (req, res) => {
  // 拿到全部的 Todo 資料
  Todo.find()
    .lean()// 不需要 mongoose 把資料都做成 mongoose 的 model，只需要單純的資料
    .then(todos => res.render('index', { todos })) //then : 下一步 // { todos : todos} = { todos }
    .catch(error => console.error('error')) //catch :抓錯誤
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  // const todo = new Todo({
  //   name // = name:name
  // }) // 在資料庫中的新資料

  return Todo.create() // 把資料寫回去伺服器端
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  // 找到 Todo 這個 collection
  return Todo.findById(id) // 從資料庫找出資料
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})