const Diemsinhvien = require("../models/diemsinhvien.model");
const KeHoachDaoTao = require("../models/KeHoachDaoTao.model");
const monHoc = require("../models/MonHoc.model");
const COTDIEMLOPHP = require("../models/cotdiem-lophocphan.model");
const CTDIEMLHP = require("../models/ct-diemsv-lhp.model");
const SINHVIEN = require("../models/sinh-vien.model");
const setData = (req) => {
  return {
    maSinhVien: req.body.maSinhVien,
    maDaoTao: req.body.maDaoTao,
    diem: req.body.diem,
    maLopHocPhan: req.body.maLopHocPhan,
    ghiChu: req.body.ghiChu,
    nguoiTao: req.body.nguoiTao,
    nguoiChinhSua: req.body.ngayChinhSua,
    ngayChinhSua: req.body.ngayChinhSua,
    trangThai: req.body.trangThai,
  };
};

exports.getDiemsinhvien = async (req, res) => {
  try {
    const diemsinhvien = await Diemsinhvien.find({
      maSinhVien: req.params.maSinhVien,
    });
    res.json({ code: 200, message: "Lấy điểm thành công", data: diemsinhvien });
  } catch (error) {
    res.json({ code: 400, message: error, data: null });
  }
};

exports.getDiemSinhVien_maSSV = async (req, res) => {
  try {
    const diemsinhvien = await Diemsinhvien.find({
      maSinhVien: req.params.maSinhVien,
    });
    let maCT =
      req.params.maSinhVien.slice(1, 2) +
      "0" +
      req.params.maSinhVien.slice(2, 7);
    const khdt = await KeHoachDaoTao.find({ maChuongTrinhDaoTao: maCT });
    const monHocs = await monHoc.find();
    diemsinhvien.forEach((diem) => {
      khdt.forEach((kh) => {
        if (diem.maDaoTao == kh.maDaoTao) {
          kh.diemsinhvien = diem.diem;
        }
      });
    });
    khdt.forEach((kh) => {
      monHocs.forEach((mh) => {
        if (kh.maMonHoc == mh.maMonHoc) {
          kh.tenMonHoc = mh.tenMonHoc;
        }
      });
    });

    let khdt_ten = [];
    khdt.forEach((el) => {
      khdt_ten.push(result(el));
    });
    res.json({ code: 200, message: "Lấy điểm thành công", data: khdt_ten });
  } catch (error) {
    res.json({ code: 400, message: error, data: null });
  }
};
let result = (req) => {
  return {
    diemsinhvien: req.diemsinhvien,
    donViHocTrinh: req.donViHocTrinh,
    soTietHoc: req.soTietHoc,
    soTuan: req.soTuan,
    hocKi: req.hocKi,
    loaiTienThu: req.loaiTienThu,
    tinh: req.tinh,
    xet: req.xet,
    nguoiTao: req.nguoiTao,
    nguoiChinhSua: req.nguoiChinhSua,
    trangThai: req.trangThai,
    maChuongTrinhDaoTao: req.maChuongTrinhDaoTao,
    maBoMon: req.maBoMon,
    maDaoTao: req.maDaoTao,
    maMonHoc: req.maMonHoc,
    tenMonHoc: req.tenMonHoc,
    ngayChinhSua: req.ngayChinhSua,
    ngayTao: req.ngayTao,
  };
};

//lấy thong tin diem sinh vien theo malop hoc phan
exports.LayTONGDIEM = async (req, res) => {
  var sinhvien = await SINHVIEN.find({maLopHocPhan:req.params.maLopHocPhan});
  var diem = await Diemsinhvien.find({ maLopHocPhan:req.params.maLopHocPhan});
  var cotDiemHP = await COTDIEMLOPHP.find();
  var ctDiem = await CTDIEMLHP.find();
  var data = [];
  var beta = [];
  var ceta = [];
  var tongDiem = [];
  sinhvien.forEach(async s => {
    diem.forEach(async x => {
      ctDiem.forEach(async y => {
        cotDiemHP.forEach(async z => {
          if (s.maSinhVien == x.maSinhVien) {
            if (x.maSinhVien == y.maSinhVien) {
              if (z.maCotDiem == y.maCotDiem) {
                data.push({ho:s.ho,ten:s.ten, maSinhVien: x.maSinhVien, diem: y.diem, tenCotDiem: z.tenCotDiem,tongDiem:x.diem});
              }
            }
          }
        })
      })
    })
  })
  res.json(data);

};