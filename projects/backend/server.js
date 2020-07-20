// const https = require('https')
// const express = require('express')
// const bodyParser = require('body-parser')
// const mongoose = require('mongoose')
// const fs = require('fs')
// const app = express()
// const cors = require('cors')
// require('./crawl').crawl()

// const MONGODB_URI = 'mongodb://elearning_team:123@103.92.26.177:27017/testAngularckc' //'mongodb://localhost:27017/'

// const PORT = 4100

// const httpsOptions = {
//   key: fs.readFileSync('./security/cert.key'),
//   cert: fs.readFileSync('./security/cert.crt')
// }

// // Connect with MongoDB
// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
//   useUnifiedTopology: true
// })

// mongoose.connection.on('error', (err) => {
//   console.log('Mongoose conection error:' + err)
// })

// mongoose.connection.once('open', () => {
//   console.log('MongoDB connected!')
// })

// // Make sure you place body-parser before your CRUD handlers!
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
// app.use(cors())

// app.use(function (req, res, next) {
//   // res.setHeader('Access-Control-Allow-Origin', 'https://127.0.0.1:4200')
//   // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
//   // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
//   // res.setHeader('Access-Control-Allow-Credentials', true)
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next()
// })

// app.use('/api', require('./api/api'))

// app.get('/', (req, res) => {
//   res.send('Back end API')
// })

// const server = https.createServer(httpsOptions, app)
//   .listen(PORT, () => {
//     console.log('Backend API running at port ' + PORT)
//   })
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const MONGODB_URI = 'mongodb://elearning_team:123@103.92.26.177:27017/testAngularckc'

// Connect with MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
})

mongoose.connection.on('error', (err) => {
  console.log('Mongoose conection error:' + err)
})

mongoose.connection.once('open', () => {
  console.log('MongoDB connected!')
})

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.listen(4100, function () {
  console.log('Backend API running!')
})

const apiRoutes = require('./api/api')
app.use('/api', apiRoutes)

