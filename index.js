const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('express-jwt')

const app = express ()
const connectDB = async() => {
    try {
      await mongoose.connect('mongodb://localhost/bookAPI')
    }catch (err){
      throw err
  }
}
connectDB()
const Book = require('./models/bookModels.js')
const bookRouter = require('./routes/bookRouter.js')(Book)
const User = require('./models/userModels.js')
const userRouter = require('./routes/userRouter.js')(User)


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.all('/api/*', jwt({secret: 'stealthySecret', algorithms: ['HS256']}).unless({ path: ['/api/login'] }))
app.use('/api', bookRouter)
app.use('/api', userRouter)

const port = 8080
app.listen(port, () => {
  console.log(`server started on port ${port}`)//eslint-disable-line
})