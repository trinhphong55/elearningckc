const https = require('https')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fs = require('fs')
const app = express()


require('./crawl').crawl()
//e-learningdb
// const MONGODB_URI = 'mongodb://elearning_team:123@103.92.26.177:27017/testAngularckc' //'mongodb://localhost:27017/'

const PORT = 4100

const httpsOptions = {
  key: fs.readFileSync('security/localhost.key'),
  cert: fs.readFileSync('security/localhost.crt')
}

// // Connect with MongoDB
// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
//   useUnifiedTopology: true
// })

mongoose.connection.on('error', (err) => {
  console.log('Mongoose conection error:' + err)
})

mongoose.connection.once('open', () => {
  console.log('MongoDB connected!')
})

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.use('/api', require('./api/api'))

app.get('/', (req, res) => {
  res.send('Back end API')
})

const server = https.createServer(httpsOptions, app)
  .listen(PORT, () => {
    console.log('Backend API running at port ' + PORT)
  })



/////// cntt region //// - cac nhom khac cmt het phan nay lai nhe
const path = require('path'),
      cors = require('cors')
//cntt-db
mongoose.connect('mongodb://127.0.0.1:27017/DATNWEBKHOACKC', { useNewUrlParser: true, useFindAndModify: false,useCreateIndex: true, useUnifiedTopology: true }, function (err, db) {
    if (err) {
        console.log("fail to connect db");
    } else {
        console.log("db connected by cntt");
    }
});
//end cntt-db
//cntt-route
  //app.use('/api', require('./api/api'))
  // var cnttTinTuc = require('./models/cntttintuc.model');
  // app.get('/test', (req, res) => {
  //   console.log('checked')
  //   cnttTinTuc.find({},(error, data) => {
  //     console.log(error)
  //     console.log(data)
  //     res.json(data);

  //   })
  // })
//end cntt-route
/////// end cntt region ////