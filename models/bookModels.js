const mongoose = require('mongoose')

const {Schema} = mongoose

const bookModel = new Schema(
  {
    title: { type: String, required: true, index: {unique: true, collation: {locale: "en", strength: 2}} },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    read: { type: Boolean, required: true },
  },
  {
    collection: 'books'
  }
)

module.exports = mongoose.model('book', bookModel)