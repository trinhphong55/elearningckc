const express = require('express');
const router = express.Router();
const LopHocPhanRoutes = require('./LopHocPhan');
const MonHoc = require('./MonHoc');

router.use('/', LopHocPhanRoutes);
router.use('/', MonHoc);

module.exports = router;
