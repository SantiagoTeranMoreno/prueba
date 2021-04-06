const express = require('express')
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator()
const validatorModels = require('../validators/validators.js')


const booksController = require('../controllers/booksController.js')
const routes = (Book) => {

  const bookRouter = express.Router()
  const controller = booksController(Book)

  bookRouter.route('/books')
    .get(controller.getBooks)
    .post(validator.body(validatorModels.booksBodySchema), controller.postBook)

  bookRouter.route('/books/:bookId')
    .get(validator.params(validatorModels.queryStringSchema), controller.getBookById)
    .put(validator.params(validatorModels.queryStringSchema), validator.body(validatorModels.booksBodySchema),controller.updateBook)//body
    .delete(validator.params(validatorModels.queryStringSchema), controller.deleteBook)
  return bookRouter
}

module.exports = routes