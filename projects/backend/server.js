const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const app = express();
const morgan = require("morgan");
const path = require("path");
const ioServer = require("socket.io");

const MONGODB_URI =
  "mongodb://ai_noi_mongo_die:khongthechetduoc@103.92.26.177:27017/devAngular?retryWrites=true&w=majority?authSource=admin";

const PORT = 4100;
const httpsOptions = {
  key: fs.readFileSync("security/localhost.key"),
  cert: fs.readFileSync("security/localhost.crt"),
};

const server = https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log("Backend API running at port " + PORT);
});

//#region Socket.io
const io = new ioServer(server);
//#endregion

// Connect with MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/ttth", {
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose conection error:" + err);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connected!");
});

// enable CORS
app.use(cors());

// Make sure you place body-parser before your CRUD handlers!
app.use(
  bodyParser.urlencoded({
    parameterLimit: 10000, // 413 Payload Too Large
    limit: "50mb", // Fixed 413 Payload Too Large
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(morgan("dev"));

// public images
app.use("/uploads/cntt", express.static(path.join(__dirname, "uploads/cntt")));

app.use("/api", require("./api/api")(io));

app.get("/", (req, res) => {
  res.send("Back end API");
});

//#region Socket.io
var numUsers = 0;
// khởi tạo kết nối socket
io.on("connection", function (socket) {
  ++numUsers;
  console.log("a socket connected.", numUsers);
  // io.emit("ThongBaoKhanCap", "hello world 1"); // main namespace
  socket.on("disconnect", function () {
    --numUsers;
    console.log("a socket disconnected.");
  });
});
//#endregion
