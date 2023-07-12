// router.use('/todos', todos) 

const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

// new
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/', (req, res) => {
  console.log('req.body:', req.body)
  const name = req.body.name
  // const todo = new Todo({
  //   name // = name:name
  // }) // 在資料庫中的新資料

  return Todo.create({ name }) // 把資料寫回去伺服器端
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// detail
router.get('/:id', (req, res) => {
  const id = req.params.id
  // 找到 Todo 這個 collection
  return Todo.findById(id) // 從資料庫找出資料
    .lean() // 把資料轉換成單純的ＪＳ物件
    .then(todo => res.render('detail', { todo })) // 把資料送給前端樣版
    .catch(error => console.log(error))
})

// edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  // 找到 Todo 這個 collection
  return Todo.findById(id) // 從資料庫找出資料
    .lean() // 把資料轉換成單純的ＪＳ物件
    .then(todo => res.render('edit', { todo })) // 把資料送給前端樣版
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body

  return Todo.findById(id) // 從資料庫找出資料
    .then(todo => {
      // console.log('req.body', req.body)
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save() // 有新的更動，都要先return
    })
    .then(() => res.redirect(`/${id}`)) // 把新資料丟去詳細頁
    .catch(error => console.log(error))
})

// delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  // 確保這個id在資料庫中，是存在的
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router