// 引入外部套件
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')

// 引用自己定義好的設定
const routes = require('./routes') // = const routes = require('./routes/index')
const port = 3000
require('./config/mongoose') //對 app.js 而言，Mongoose 連線設定只需要「被執行」，不需要接到任何回傳參數繼續利用，所以這裡不需要再設定變數

// 使用套件產生的東西
const app = express()

// 使用 引入的資源
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(methodOverride('_method'))
app.use(routes)
app.use(bodyParser.urlencoded({ extended: true })) // use：每一個require都需要來這裡; urlencoded：幫忙解析內容

// 建立監聽器
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})