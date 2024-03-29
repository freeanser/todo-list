const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // 定義：要參考 User model
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Todo', todoSchema)
