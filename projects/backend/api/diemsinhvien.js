const Diemsinhvien = require("../models/diemsinhvien.model");
const KeHoachDaoTao = require("../models/KeHoachDaoTao.model");
const monHoc = require("../models/MonHoc.model");
const COTDIEMLOPHP = require("../models/cotdiem-lophocphan.model");
const CTDIEMLHP = require("../models/ct-diemsv-lhp.model");
const SINHVIEN = require("../models/sinh-vien.model");
const lophocphan = require("../models/LopHocPhan.model");
const { FORMERR } = require("dns");
const { combineLatest, async } = require("rxjs");
const { config } = require("process");
const { clear } = require("console");
const diemsinhvienModel = require("../models/diemsinhvien.model");
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
  try {
    var sinhvien=[]
     sinhvien = await SINHVIEN.find({ trangThai: 1 });
    var diem = await Diemsinhvien.find({ maLopHocPhan: req.params.maLopHocPhan });
    var cotDiemHP = await COTDIEMLOPHP.find({ trangThai: 1, maLopHocPhan: req.params.maLopHocPhan });
    var ctDiem = await CTDIEMLHP.find({ trangThai: 1 , maHocPhan:req.params.maLopHocPhan });
    var lhp = await lophocphan.find({ maLopHocPhan: req.params.maLopHocPhan, trangThai: 1 })
    //dssv
    var dsSv = [];
    for (let sv of sinhvien) {
      for (let lh of lhp) {
        if (sv.maLopHoc == lh.maLopHoc && lh.maLopHocPhan == req.params.maLopHocPhan) {
          dsSv.push({ ho: sv.ho, ten: sv.ten, mssv: sv.maSinhVien, email: sv.email, tongDiem: 0, tongHeSo: 0 })
        }
      }
    }
    ///chi tiet cot diem
    var data = [];
    for (let ct of cotDiemHP) {
      for (let i of ctDiem) {
        if (i.maCotDiem == ct.maCotDiem) {
          data.push({ diem: (i.diem * ct.heSo), mssv: i.maSinhVien, heSo: parseInt(ct.heSo) })
        }
      }
    }
    ///lay tong diem  sinh vien
    var dsTongDiem = [];
    for (let sv of dsSv) {
      for (let d of data) {
        if (sv.mssv == d.mssv) {

          sv.tongDiem += d.diem;
          sv.tongHeSo += d.heSo;
          dsTongDiem.push({ ho: sv.ho, ten: sv.ten, mssv: sv.mssv, email: sv.email, tongDiem: sv.tongDiem, tongHeSo: sv.tongHeSo, diemTongKet: (Math.round(((sv.tongDiem / sv.tongHeSo) + Number.EPSILON) * 100) / 100) })
        }
      }
    }
    //lay ds diem tong ke 
    var diemTongKet = [];
    var cd = cotDiemHP.length;
    var ct = ctDiem.length;
    for (let i = 0; i < ct; i++) {
      i = i + (cd - 1);
      diemTongKet.push(dsTongDiem[i])
    }
    res.json(diemTongKet);
  } catch (err) {
    console.log(err)
  }
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index);
  }
}

exports.luuTongDiem = async (req, res) => {
    try {
      var dsv= await Diemsinhvien.find({maLopHocPhan:req.params.maLopHocPhan,trangThai:1});
      var a;
      req.body.forEach(x=>{
      dsv.forEach(y=>{
        if(x.mssv==y.maSinhVien)
        {
          a=1;
        }
      })
      });
      if(a!=1)
      {
      dsDiem = req.body;
    //check req.body rong
    await asyncForEach(dsDiem, async (diem, index) => {
      let newDiem = new Diemsinhvien({
        maSinhVien: diem.mssv,
        maDaoTao: "30061711211",
        maLopHocPhan: req.params.maLopHocPhan,
        diem: diem.diemTongKet,
        maChuDe: "1",
        nguoiTao: "admin",
        nguoiChinhSua: "admin",
      });
      newDiem.save();
    })
    return res.json({status:200});
  }
  else
  {
    return res.status(500).json({
      status: 200,
      message: "Điểm tông kết đã được lưu",
    });
  }
    } catch (error) {
      
    }
};

exports.xoaDiem = async (req, res) => {
  try {
    var data =   await Diemsinhvien.deleteMany();
    res.json({ code: 200, message: "xoa thành công", data });
  } catch (error) {
    res.json({ code: 400, message: error, data: null });
  }
};
