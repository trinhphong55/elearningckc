const ctDiemsvLhpModel = require("../models/ct-diemsv-lhp.model");
const SINHVIEN = require("../models/sinh-vien.model");
const LopHocPhan = require("../models/LopHocPhan.model");
const cotdiemLophocphanModel = require("../models/cotdiem-lophocphan.model");
const BaiTap = require("../models/BaiTap.model");
const chuDeModel = require("../models/chu-de.model");
///lay chi tiet diem lop hp theo ma lop hp
exports.layCTDiemLopHPtheoMaLopHP = async (req, res) => {
  try {
    var data = await ctDiemsvLhpModel.find({ maHocPhan: req.params.maHocPhan });
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};
const view = (req) => {
  return {
    ngayChinhSua: req.ngayChinhSua,
    trangThai: req.trangThai,
    maSinhVien: req.maSinhVien,
    maHocPhan: req.maHocPhan,
    tenLopHocPhan: req.tenLopHocPhan,
    maCotDiem: req.maCotDiem,
    tenCotDiem: req.tenCotDiem,
    diem: req.diem,
    maChuDe: req.maChuDe,
    tenBaiTap: req.tenBaiTap,
    tenChuDe: req.tenChuDe,
    nguoiTao: req.nguoiTao,
    heSo: req.heSo,
    hocKi: req.hocKi,
    nguoiChinhSua: req.nguoiChinhSua,
  };
};
exports.layCTDiemLopHPtheoMaSV = async (req, res) => {
  try {
    const dsLopHocPhan = await LopHocPhan.find({ trangThai: 1 });
    const dsCotDiem = await cotdiemLophocphanModel.find({ trangThai: 1 });
    const dsBaiTap = await BaiTap.find({ trangThai: 1 });
    const dsChuDe = await chuDeModel.find({ trangThai: 1 });

    const dsCTDiem = await ctDiemsvLhpModel.find({
      maSinhVien: req.params.masv,
    });
    let ketQua = [];

    dsCTDiem.forEach((diem) => {
      dsLopHocPhan.forEach((lhp) => {
        if (diem.maHocPhan == lhp.maLopHocPhan) {
          diem.tenLopHocPhan = lhp.tenLopHocPhan;
          diem.hocKi = lhp.hocKi;
        }
      });
      dsCotDiem.forEach((cot) => {
        if (cot.maCotDiem == diem.maCotDiem) {
          diem.tenCotDiem = cot.tenCotDiem;
          diem.heSo = cot.heSo;
        }
      });
      dsBaiTap.forEach((bt) => {
        if (bt.maBaiTap == diem.maChuDe) {
          diem.tenBaiTap = bt.tieuDe;
        }
      });
      dsChuDe.forEach((cd) => {
        if (cd.maChuDe == diem.maChuDe) {
          diem.tenChuDe = cd.tenChuDe;
        }
      });
      ketQua.push(view(diem));
    });

    res.json({
      id: req.params.masv,
      data: ketQua,
      count: ketQua.length,
      message: "Lấy thành công điểm lớp học phần",
    });
  } catch (error) {
    res.json(error);
  }
};

//hien thi diem sinh vien theo bt
exports.dsChamDiemSinhVien = async (req, res) => {
  try {
    diemsinhvien = await ctDiemsvLhpModel.find({ maCotDiem: req.params.maCotDiem, trangThai: 1 });
    sinhvien = await SINHVIEN.find({ trangThai: 1 });
    var data = []
    diemsinhvien.forEach(async x => {
      sinhvien.forEach(async y => {
        if (x.maSinhVien == y.maSinhVien) {
          data.push({ ho: y.ho, ten: y.ten, diem: x.diem, maSinhVien: x.maSinhVien, _id: x._id })
        }
      });
    });
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};
/// cham diem sinh vien
exports.chamdiemsinhvienlophocphan = async (req, res) => {
  try {
    const { diem } = req.body;
    await ctDiemsvLhpModel.updateOne(
      { _id: req.params.id },
      { $set: { diem } }
    ).then(() => {
      res.json({ status: "success" });
    }).catch(err => {
      res.json({ message: err });
    });
  } catch (error) {
    res.json(error);
  }
}
//
exports.thongTinXuatExcel = async (req, res) => {
  try {
    diemsinhvien = await ctDiemsvLhpModel.find({ maCotDiem: req.params.maCotDiem, trangThai: 1 });
    sinhvien = await SINHVIEN.find({ trangThai: 1 });
    cotdiem = await cotdiemLophocphanModel.find({ maCotDiem: req.params.maCotDiem, trangThai: 1 });
    var data = []
    cotdiem.forEach(async z => {
    diemsinhvien.forEach(async x => {
      sinhvien.forEach(async y => {
          if (z.maCotDiem==z.maCotDiem) {
            if (x.maSinhVien == y.maSinhVien) {
              data.push({ Họ: y.ho, Tên: y.ten, MSSV: x.maSinhVien, Điểm: x.diem, TênCộtĐiểm: z.tenCotDiem, hệsố: z.heSo })
            }
          }
        });
      });
    });
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};
