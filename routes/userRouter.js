const express = require('express')
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator()
const validatorModels = require('../validators/validators.js')


const usersController = require('../controllers/usersController.js')
const routes = (User) => {

  const userRouter = express.Router()
  const controller = usersController(User)

  userRouter.route('/users')
    .get(controller.getUsers)
    .post(validator.body(validatorModels.usersBodySchema),controller.postUser)

  userRouter.route('/users/:userId')//querystrinng validacion necesaria
    .get(validator.params(validatorModels.queryStringSchema), controller.getUserById)
    .put(validator.params(validatorModels.queryStringSchema), validator.body(validatorModels.usersBodySchema), controller.updateUser)//body validacion necesaria
    .delete(validator.params(validatorModels.queryStringSchema), controller.deleteUser)

  userRouter.route('/login')
    .post(validator.body(validatorModels.userslogInBodySchema) ,controller.userLogIn)//validacion necesaria
  return userRouter
}

module.exports = routes