const mongoose = require('mongoose')

const {Schema} = mongoose

const userModel = Schema(
  {
    firstName: {type: String},
    lastName: {type: String},
    userName: {type: String},
    password: {type: String},
    email: {type: String},
    adress: {type: String},
    phone: {type: String}
  },
  {
    collection: 'users'
  }
)

module.exports = mongoose.model('user', userModel)