const router = require('express').Router();
const GiaoVienDAO = require('../DAO/GiaoVienDAO');
const md5 = require('md5');

const giaoVienDAO = new GiaoVienDAO();

function formatMaGV(maGV){
  let temp = Number(maGV) + 1;
  let i = 4 - temp.toString().length;
  let result = '';
  while(i > 0){
    result += '0';
    i--;
  }
  result += temp.toString();
  return result;
}
router.post('/them-giao-vien', async (req, res) =>{
  const temp = await giaoVienDAO.layMaGVMoiNhat();
  let maGV;
  if(temp != undefined){
    maGV = formatMaGV(temp.maGiaoVien);
  }
  else{
    maGV = '0001';
  }
  req.body.password = md5(req.body.password);
  req.body.maGiaoVien = maGV;
  let result = await giaoVienDAO.find({email: req.body.email});
  if(result.length > 0){
    res.send({
      'msg': 'Đã tồn tại email này',
      'status': false
    })
  }
  else{
    let result = await giaoVienDAO.updateOrInsertOne({maGiaoVien: maGV}, req.body, 'GiaoVien')
    if(result != false){
      res.send({
        'msg': 'Thêm giáo viên thành công',
        'status': true
      });
    }
    else{
      res.send({
        'msg': 'Thêm giáo viên thất bại',
        'status': false
      });
    }
  }
})

router.post('/cap-nhat-giao-vien', async (req, res) => {
  // let result = await giaoVienDAO.find({email: {$ne: req.body.email}});
  // if(result.length > 0){
  //   res.send({
  //     'msg': 'Đã tồn tại email này',
  //     'status': false
  //   })
  // }
  // else{
    let result = await giaoVienDAO.updateOrInsertOne({maGiaoVien: req.body.maGiaoVien}, req.body, 'GiaoVien')
    if(result != false){
      res.send({
        'msg': 'Cập nhật thông tin giáo viên thành công',
        'status': true
      });
    }
    else{
      res.send({
        'msg': 'Cập nhật thông tin giáo viên thất bại',
        'status': false
      });
    }
  // }
})

router.post('/xoa-giao-vien', async (req, res) =>{
  // console.log('xoa-giao-vien');
  let result = await giaoVienDAO.updateOrInsertOne({maGiaoVien: req.body.maGiaoVien}, {trangThai: 0}, 'GiaoVien')
  if(result != false){
    res.send({
      'msg': 'Xóa thành công',
      'status': true
    });
  }
  else{
    res.send({
      'msg': 'Xóa thất bại',
      'status': false
    });
  }
})

router.get('/danh-sach-giao-vien-theo-trang-thai/:trangThai', async (req, res) => {
  let trangThai = req.params.trangThai;
  let result = await giaoVienDAO.layDanhSachGiaoVienTheoTrangThai(trangThai);
  res.send(result);
})

//Restore giáo viên
router.put('/setTrangThai/:maGiaoVien', async (req, res) => {
  const maGV = req.params.maGiaoVien;
  let result = await giaoVienDAO.restoreGiaoVien(maGV);
  if(result != false){
    res.send({
      'msg': 'Phục hồi thành công',
      'status': true
    });
  }
  else{
    res.send({
      'msg': 'Phục hồi thất bại',
      'status': false
    });
  }
})

// Lấy danh sách giáo viên
router.get('/danh-sach-giao-vien', async (req, res) => {
  let result = await giaoVienDAO.layDanhSachGiaoVien();
  res.send(result);
})

// Lấy thông tin giáo viên
router.post('/thong-tin-giao-vien', async (req, res) => {
  let result = await giaoVienDAO.layThongTinGiaoVien(req.body.maGiaoVien);
  res.send(result);
})

// Lấy thông tin giáo viên theo email
router.get('/thong-tin-giao-vien-email/:email', async (req, res) => {
  let result = await giaoVienDAO.layThongTinGiaoVienTheoEmail(req.params.email);
  res.send(result);
})

router.post('/cap-nhat-giao-vien-new-tt', async (req, res) => {
  var data = {
    sdt:req.body.sdt,
    password:md5(req.body.password)
  }
  let result = await giaoVienDAO.updateOrInsertOne({maGiaoVien: req.body.maGiaoVien}, data, 'GiaoVien');
  if(result != false){
    res.send({
      'msg': 'Cập nhật thành công',
      'status': true
    });
  }
  else{
    res.send({
      'msg': 'Cập nhật thất bại',
      'status': false
    });
  }
})
router.post('/cap-nhat-bo-mon', async(req, res) => {
  const maGV = req.body.maGV;
  const maBoMon = req.body.maBoMon;
  let result = await giaoVienDAO.capNhatBoMon(maGV, maBoMon);
  if(result != false){
    res.send({
      'msg': 'Cập nhật bộ môn phụ trách của giáo viên thành công',
      'status': true
    });
  }
  else{
    res.send({
      'msg': 'Cập nhật bộ môn phụ trách của giáo viên thất bại',
      'status': false
    });
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
