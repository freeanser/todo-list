// index.js 是總路由器，管理底下的 modules
const express = require('express')
const router = express.Router()

// 引入資源後，記得要使用資源
const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')
router.use('/', home)
router.use('/todos', todos)
router.use('/users', users)

// 導出此路由
module.exports = router