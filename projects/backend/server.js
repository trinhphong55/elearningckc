const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const app = express();
const morgan = require("morgan");
const path = require("path");
//e-learningdb
// const MONGODB_URI = 'mongodb://elearning_team:123@103.92.26.177:27017/testAngularckc' //'mongodb://localhost:27017/'

const PORT = 4100;

const httpsOptions = {
  key: fs.readFileSync("security/localhost.key"),
  cert: fs.readFileSync("security/localhost.crt"),
};

// // Connect with MongoDB
// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
//   useUnifiedTopology: true
// })

mongoose.connection.on("error", (err) => {
  console.log("Mongoose conection error:" + err);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connected!");
});

// enable CORS
app.use(cors());

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// public images
app.use(
  "/uploads/cntt",
  express.static(path.join(__dirname, "uploads/cntt"))
);

app.use("/api", require("./api/api"));

app.get("/", (req, res) => {
  res.send("Back end API");
});

const server = https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log("Backend API running at port " + PORT);
});

// cntt
mongoose.connect(
  "mongodb://127.0.0.1:27017/ttth",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  function (err, db) {
    if (err) {
      console.log("fail to connect db");
    } else {
      console.log("db connected by cntt");
    }
  }
);
