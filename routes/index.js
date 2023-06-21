// index.js 是總路由器，管理底下的 modules

const express = require('express')
const router = express.Router()


const home = require('./modules/home')
const todos = require('./modules/todos')

router.use('/', home)
router.use('/todos', todos)

// 導出此路由
module.exports = router