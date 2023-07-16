// 引入外部套件
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const flash = require('connect-flash')

require('dotenv').config()

// 僅在非正式環境時，使用dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 引用自己定義好的設定
const routes = require('./routes') // = const routes = require('./routes/index')
const port = 3000

const usePassport = require('./config/passport')
require('./config/mongoose') //對 app.js 而言，Mongoose 連線設定只需要「被執行」，不需要接到任何回傳參數繼續利用，所以這裡不需要再設定變數

// 使用套件產生的東西
const app = express()

// 使用 引入的資源
app.use(bodyParser.urlencoded({ extended: true })) // use：每一個require都需要來這裡; urlencoded：幫忙解析內容 // 要放在 app.use(routes)前面
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, // resave: 每次跟使用者互動，都會強制更新 session
  saveUninitialized: true // 儲存新的 session
}))
app.use(methodOverride('_method'))

usePassport(app) // 因為 passport 最後是輸出一個 function
app.use(flash)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

// 建立監聽器
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})