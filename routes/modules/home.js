const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/', (req, res) => {

  const userId = req.user._id
  Todo.find({ userId })
    .lean()// 不需要 mongoose 把資料都做成 mongoose 的 model，只需要單純的資料
    .sort({ _id: "asc" }) // 反序： desc
    .then(todos => res.render('index', { todos })) //then : 下一步 // 把從資料庫拿到的資料，取名 todo : { todos : todos} = { todos }
    .catch(error => console.error('error')) //catch :抓錯誤
})

// 如果在 home.js 文件中没有使用 module.exports = router 导出路由对象，那么在 index.js 中使用 const home = require('./modules/home') 时将无法成功导入路由对象。
module.exports = router