/*const test = () => {
    console.log ('hola mundo despues de 4 segundos')
}

setTimeout(test, 4000);
*/
/*setInterval(() => {
    console.log('hola curso')
},
3000)
for (let i = 0; i < 1e10; i++){
    //rompiendo js
}
*/
/* escribir el mensaje hello world cada 4 segundos y cada 8*/

/*const randomNumber = Math.random()
console.log(randomNumber)
if (randomNumber < 0.5){
    setInterval(() => {
        console.log('hola curso')
    },
    4000)
} else {
    setInterval(() => {
        console.log('hola curso')
    },
    8000)
}*/

/* const intervalAsked = ("Enter how many seconds you want for interval")
setInterval(() => {
    console.log('hola curso') //eslint-disable-line
},
intervalAsked * 1000) */

/*  const http = require('http')

const server = http.createServer((req, res)=> {
    //request
    //respond
    res.end('hello world')
})

server.listen(8080, () => {
    console.log('server is running...')
})
*/

/* const api = require('./api.js')

const result = api.sum(5,5)
console.log('result:', result)*/

/* const fs = require('fs')

const files = ['./package.json', './api.js']

files.forEach(file => {
    try{
        const data = fs.readFileSync(file)
        console.log('file data is:', data)
    } catch (error) {
        console.log('error:', error)
        if (error.code === 'ENOENT'){
            console.log('file not found')
        } else {
            throw error
        }
    }
})
*/
/* const express = require('express')
const app = express()
app.get('/', function (req, res) {
  res.send('Hello World')
})
const port = 8080
app.listen(port,() => {
    console.log(`server is running on port: ${port}`)
})*/


const express = require('express')

const app = express ()
const bookRouter = express.Router()

bookRouter.route('/books').get((req, res) => {
  const response = {
    book: 'Harry potter 1',
    author: 'J.K. Rowling'
  }

  res.json(response)
})

app.use('/api', bookRouter)
const port = 8080
app.listen(port, () => {
  console.log(`server started on port ${port}`)//eslint-disable-line
})


