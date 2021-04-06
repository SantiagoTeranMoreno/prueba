const { Mongoose } = require("mongoose")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const usersController = (User) => {
  const getUsers = async (req, res) => {
    try {const { query } = req
      const response = await User.find(query)

      return res.json(response)
    } catch (error) {
      throw error
    }
  }
  
  const postUser = async(req,res) => {

    const saltingFactor = 10
    const encryptedPassword = await bcrypt.hash(req.body.password, saltingFactor)

    
    const userCreator = () => {

      const newUserName = () => {
        //logic

        return (req.body.lastName + '.' + req.body.firstName)
      }
      
      const userObject = {
        ...req.body,
        userName: newUserName(),
        password: encryptedPassword
        }
        return userObject
      }
      
    try{
      const user = new User(userCreator())
      console.log("user: ", user)
      //console.log ("User: ", userCreator())
      await user.save()
  
      return res.status(201).json(user)
    }catch (error) {
      throw error
    }
  } 

  const getUserById = async (req,res) => {
    try {
      const { params } = req
      const response = await User.findById(params.userId)

      res.json(response)
    }catch (error){
      throw error
    }
  }
  const updateUser = async(req,res) => {
    try{
      const { params, body } = req
      const response = await User.updateOne({
        _id: params.userId
        }, {
          //Cuidado con esto 
         $set: {
           firstName: body.firstName,
           lastName: body.lastName,
           userName: body.userName,
           password: body.password,
           email: body.email,
           adress: body.adress,
           phone: body.phone
        }
      }) 
    return res.status(202).json(response)
  } catch (error) {
    throw error
  }
    
  }
  const deleteUser = async(req,res) => {
    try{
      const{ params } = req
    console.log (params)
    await User.findByIdAndDelete(params.userId)
    return res.status(202).json({message:"El usuario fue eliminado"})
    } catch (error) {
      throw error
    }
  }
  const userLogIn = async(req,res) => { 
    try{
      const  {body} = req
      const loggingUser = await User.findOne({userName: body.userName}, function(err,obj) {console.log(obj)})

      
      if (loggingUser == null){
        return res.status(404).json({message:"credenciales invalidas"})
      } else {
        const tokenUser = {
          firstName: loggingUser.firstName,
          lastName: loggingUser.lastName,
          userName: loggingUser.userName
        }


        const isPassworsCorrect = await bcrypt.compare(body.password, loggingUser.password)
        
        if (isPassworsCorrect) {

          const token = jwt.sign({userName: tokenUser}, 'stealthySecret' , {expiresIn: '1h'})

          return res.status(202).json({message:"ok", token: token})
        }else{
          return res.status(404).json({message:"credenciales invalidas"})
        }
      }
    } catch (error) {
      throw error
    }
  }
  return {getUsers, postUser, getUserById, updateUser, deleteUser, userLogIn} 
}

module.exports = usersController