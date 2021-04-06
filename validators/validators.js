const express= require('express')
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator()


const booksBodySchema = Joi.object({
  title: Joi.string().required(),
  author:Joi.string().required(),
  genre: Joi.string().required(),
  read:Joi.boolean().required(),
})

const usersBodySchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  userName: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
  adress: Joi.string().required(),
  phone: Joi.string().required()
})
const userslogInBodySchema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required()
})
const queryStringSchema = Joi.object({
  bookId: Joi.string().max(24).min(24),
  userId: Joi.string().max(24).min(24)
})
module.exports = {booksBodySchema, usersBodySchema, userslogInBodySchema, queryStringSchema}