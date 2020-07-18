const express = require("express");
const khoabomonController = require("../controllers/khoabomon.controller");
const khoabomonModel = require("../models/khoabomon.model");
const loaidonviModel = require("../models/loaidonvi.model");
const router = express.Router();
const loaidonviController = require("../controllers/loaidonvi.controller");

router.get("/khoabomon", khoabomonController.getKhoaBonMon);

router.post("/khoabomon", khoabomonController.postKhoaBoMon);

router.delete("/khoabomon/:id", khoabomonController.deleteKhoaBoMon);

router.put("/khoabomon/:id", khoabomonController.updateKhoaBoMon);

router.get("/loaidonvi", loaidonviController.getLoaiDonVi);

module.exports = router;
