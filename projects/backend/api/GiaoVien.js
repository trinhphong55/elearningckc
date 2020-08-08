const router = require('express').Router();
const GiaoVienDAO = require('../DAO/GiaoVienDAO');
const md5 = require('md5');

const giaoVienDAO = new GiaoVienDAO();
router.post('/them-giao-vien', async (req, res) =>{
  req.body.matKhauBanDau = md5(req.body.matKhauBanDau);
  let result = await giaoVienDAO.updateOrInsertOne({maGiaoVien: req.body.maGiaoVien}, req.body)
  if(result != false){
    res.send({'msg': 'Thêm thành công'});
  }
  else{
    res.send({'msg': 'Thêm thất bại'});
  }
})

router.post('/xoa-giao-vien', async (req, res) =>{
  console.log('xoa-giao-vien');
  let result = await giaoVienDAO.updateOrInsertOne({maGiaoVien: req.body.maGiaoVien}, {trangThai: 0})
  if(result != false){
    res.send({'msg': 'Xóa thành công'});
  }
  else{
    res.send({'msg': 'Xóa thất bại'});
  }
})

router.get('/danh-sach-giao-vien', async (req, res) => {
  let result = await giaoVienDAO.layDanhSachGiaoVien();
  res.send(result);
})

router.post('/thong-tin-giao-vien', async (req, res) => {
  let result = await giaoVienDAO.layThongTinGiaoVien(req.body.maGiaoVien);
  res.send(result);
})

router.get('/thong-tin-giao-vien-email/:email', async (req, res) => {
  let result = await giaoVienDAO.layThongTinGiaoVienTheoEmail(req.params.email);
  res.send(result);
})

router.post('/cap-nhat-giao-vien', async (req, res) => {
  req.body.matKhauBanDau = md5(req.body.matKhauBanDau);
  let result = await giaoVienDAO.updateOrInsertOne({maGiaoVien: req.body.maGiaoVien}, req.body)
  if(result != false){
    res.send({'msg': 'Cập nhật thành công'});
  }
  else{
    res.send({'msg': 'Cập nhật thất bại'});
  }
})

router.get('/lay-ma-gv-moi-nhat', async (req, res) => {
  let result = await giaoVienDAO.layMaGVMoiNhat();
  res.send(result);
})

router.post('/them-giao-vien-excel', async (req, res) => {
  let result = await giaoVienDAO.importExcel(req.body);
  if(result != false){
    res.send({'msg': 'Import thành công'});
  }
  else{
    res.send({'msg': 'Dữ liệu giáo viên trong excel đã tồn tại'});
  }
})
module.exports = router;
