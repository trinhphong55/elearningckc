var express = require("express");
var _router = express.Router();
var path = require("path");

_router.post("/download", function (req, res, next) {
  console.log(req.body);
  filepath =
    path.join(__dirname, "../uploads/templateImportExcel") +
    "/" +
    req.body.filename;
  res.sendFile(filepath);
});

module.exports = _router;
