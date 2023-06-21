// 引入外部資源
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
// 引入資料和資料格式
const Todo = require('./models/todo')
// 引入路由
const routes = require('./routes') // = const routes = require('./routes/index')

// 使用 引入的資源
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true })) // use：每一個require都需要來這裡; urlencoded：幫忙解析內容
app.use(methodOverride('_method'))
// 使用 引入的路由器
app.use(routes)

// 僅在非正式環境時，使用dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 將 connect 的結果，儲存下來，並確認是否成功
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
// once ：一次性的。只要成功open,就移除此監聽器
db.once('open', () => {
  console.log('mongobd connected')
})

// 建立監聽器
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})