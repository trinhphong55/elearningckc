const ctDiemsvLhpModel = require("../models/ct-diemsv-lhp.model");
const SINHVIEN = require("../models/sinh-vien.model");
///lay chi tiet diem lop hp theo ma lop hp
exports.layCTDiemLopHPtheoMaLopHP = async (req, res) => {
  try {
    var data = await ctDiemsvLhpModel.find({maHocPhan:req.params.maHocPhan});
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};
exports.layCTDiemLopHPtheoMaSV = async (req, res) => {
  try {
    const diem = await ctDiemsvLhpModel.find({ maSinhVien: req.params.masv });
    res.json({
      id:req.params.masv,
      data: diem,
      count: diem.length,
      message: "Lấy thành công điểm lớp học phần",
    });
  } catch (error) {
    res.json(error);
  }
};

//hien thi diem sinh vien theo bt
exports.dsChamDiemSinhVien = async (req, res) => {
  try {
     diemsinhvien = await ctDiemsvLhpModel.find({maCotDiem:req.params.maCotDiem,trangThai:1});
     sinhvien = await SINHVIEN.find({trangThai:1,});
     var data=[]
     diemsinhvien.forEach(async x => {
      sinhvien.forEach(async y => {
        if(x.maSinhVien==y.maSinhVien)
        {
          data.push({ho:y.ho,ten:y.ten,diem:x.diem,maSinhVien:x.maSinhVien,_id:x._id})
        }
     });
    });
    res.json( data);
  } catch (error) {
    res.json(error);
  }
};
/// cham diem sinh vien
exports.chamdiemsinhvienlophocphan = async (req, res) => {
    try {
    const { diem } = req.body;
    await ctDiemsvLhpModel.updateOne(
      { _id: req.params.id},
      { $set: { diem} }
    ).then(() => {
      res.json({ status: "success" });
    }).catch(err => {
      res.json({ message: err });
    });
  } catch (error) {
    res.json(error);
  }
};