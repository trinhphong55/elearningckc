const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const MONGODB_URI = 'mongodb://elearning_team:123@103.92.26.177:27017/testAngularckc'; //'mongodb://localhost:27017/'

// Connect with MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose conection error:' + err)
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected!')
});

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.listen(4100, function () {
  console.log('Backend API running!');
});


app.use('/api', require('./api/api'));

app.get('/', (req, res) => {
  res.send('Back end API');
});
