// config 指參數的調整 （configuration 環境設定）
const mongoose = require('mongoose')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 連線
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

// once ：一次性的。只要成功open,就移除此監聽器
db.once('open', () => {
  console.log('mongobd connected')
})

module.exports = db