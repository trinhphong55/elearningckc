const router = require("express").Router();
const TKB = require("../models/TKB.model");
const excel = require("exceljs");

const LopHocPhan = require("../models/LopHocPhan.model");
const KHDT = require("../models/KeHoachDaoTao.model");
const GVLHP = require("../models/GiaoVienLopHocPhan.model");
const GiaoVienDAO = require("../DAO/GiaoVienDAO");
const giaoVienDAO = new GiaoVienDAO();

const { asyncForEach } = require("../utils/MonHoc.util");
const MonHoc = require("../models/MonHoc.model");

router.post("/exportexcel", async (req, res) => {
  const { maLopHoc, tenLopHoc } = req.body;
  const hocKi = parseInt(req.body.hocKi);

  let dsLHP = [];
  let tkb = [];
  let tuanBatDau = 1;
  let tuanKetThuc = 52;
  let newTKB = [];
  let dsMonHoc = [];

  dsLHP = await LopHocPhan.find({ maLopHoc, hocKi, trangThai: { $ne: 0 } });
  if (dsLHP.length === 0) {
    return res.json({ error: "ma Lop Hoc khong ton tai" });
  }

  await asyncForEach(dsLHP, async (lhp, index) => {
    let maMonHoc = lhp.maDaoTao.slice(lhp.maDaoTao.length - 4);
    let tenMonHocVietTat = lhp.tenVietTatLopHocPhan.split("-")[1].trim();
    let maGiaoVien = "null";
    let tenGiaoVien = "null";
    await GVLHP.findOne({
      maLopHocPhan: lhp.maLopHocPhan,
      trangThai: { $ne: 0 },
    }).then((gvlhp) => {
      if (gvlhp === null) {
        tenGiaoVien = "Chưa có GVLHP";
      } else {
        maGiaoVien = gvlhp.maGiaoVien;
      }
    });
    if (maGiaoVien !== "null") {
      await giaoVienDAO.layThongTinGiaoVien(maGiaoVien).then((gv) => {
        tenGiaoVien = gv[0].ho + " " + gv[0].ten;
      });
    }
    let tenMonHoc = tenMonHocVietTat + " - " + tenGiaoVien;
    dsMonHoc.push({ maMonHoc, tenMonHoc });
  });

  await TKB.findOne({ maLopHoc, hocKi }).then((yasuo) => {
    if (yasuo !== null) {
      tkb = yasuo.data;
      tuanBatDau = yasuo.tuanBatDau;
      tuanKetThuc = yasuo.tuanKetThuc;
    }
  });
  console.log(tkb === []);
  if (tkb.length === 0) {
    return res.json({ error: "Thoi khoa bieu chua co" });
  }
  await asyncForEach(tkb, async (tiet) => {
    let temp = [];
    await asyncForEach(tiet, async (thu) => {
      if (thu !== "") {
        tmpMonHoc = dsMonHoc.find((mh) => mh.maMonHoc === thu);
        temp.push(tmpMonHoc.tenMonHoc);
      } else {
        temp.push("");
      }
    });
    newTKB.push(temp);
  });
  // return res.json(newTKB);

  const title = `Thời khóa biểu lớp ${tenLopHoc}`;
  const tenTruong = "TRƯỜNG CAO ĐẲNG KỸ THUẬT CAO THẮNG";
  const info = "ADMIN - PHẦN MỀM QUẢN LÝ HỆ THỐNG";
  const workSheetName = `TKB_${tenLopHoc}`;

  const header = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6"];

  // Create workbook and worksheet
  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet(workSheetName);

  const info1Row = worksheet.addRow([tenTruong]);
  const info2Row = worksheet.addRow([info]);
  info1Row.alignment = { vertical: "middle", horizontal: "center" };
  info2Row.alignment = { vertical: "middle", horizontal: "center" };

  const titleRow = worksheet.addRow([title]);
  titleRow.font = { family: 4, size: 24, underline: "double", bold: true };
  titleRow.alignment = { vertical: "middle", horizontal: "center" };
  worksheet.addRow([]);

  const subTitleRow = worksheet.addRow([
    `Tuần bắt đầu: ${tuanBatDau} --- Tuần kết thúc: ${tuanKetThuc}`,
  ]);
  subTitleRow.font = { bold: true };
  subTitleRow.alignment = { vertical: "middle", horizontal: "center" };

  // Add Image
  // const logo = workbook.addImage({
  //   base64: logoFile.logoBase64,
  //   extension: 'png',
  // });

  // worksheet.addImage(logo, 'E1:F3');
  worksheet.mergeCells("A1:B1");
  worksheet.mergeCells("A2:B2");
  worksheet.mergeCells("A3:E4");
  worksheet.mergeCells("A5:E5");

  // Blank Row

  // Add Header Row
  const headerRow = worksheet.addRow(header);

  // Cell Style : Fill and Border
  headerRow.eachCell((cell, number) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFF00" },
      bgColor: { argb: "FF0000FF" },
    };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.font = { bold: true };
  });
  // worksheet.addRows(newTKB);

  // Add Data and Conditional Formatting
  let tiet = 1;
  newTKB.forEach((d) => {
    if (tiet === 7) {
      const rowNghiTrua = worksheet.addRow(["Nghỉ trưa"]);
      worksheet.mergeCells("A13:E13");
      rowNghiTrua.font = { size: 20, bold: true };
      rowNghiTrua.getCell(1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "CBCDE9" },
      };
      rowNghiTrua.alignment = { vertical: "middle", horizontal: "center" };
    }
    tiet++;
    const row = worksheet.addRow(d);
    row.alignment = { vertical: "middle", horizontal: "center" };
    row.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    let index = 1;
    d.forEach((cell) => {
      let qty = row.getCell(index);
      let color = "FF99FF99";
      if (cell === "") {
        color = "FF9999";
      }
      qty.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: color },
      };
      index++;
    });
    index++;
    // const qty = row.getCell(5);
    // let color = 'FF99FF99';
    // if (+qty.value < 500) {
    //   color = 'FF9999';
    // }

    // qty.fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: color }
    // };
  });

  worksheet.getColumn(1).width = 27;
  worksheet.getColumn(2).width = 27;
  worksheet.getColumn(3).width = 27;
  worksheet.getColumn(4).width = 27;
  worksheet.getColumn(5).width = 27;
  worksheet.addRow([]);

  // // Footer Row
  // const footerRow = worksheet.addRow(['This is system generated excel sheet.']);
  // footerRow.getCell(1).fill = {
  //   type: 'pattern',
  //   pattern: 'solid',
  //   fgColor: { argb: 'FFCCFFE5' }
  // };
  // footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

  // // Merge Cells
  // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

  // Generate Excel File with given name
  workbook.xlsx.writeBuffer().then((data) => {
    res.send(data);
  });
});

router.get("/android/malophoc/:maLopHoc/hocki/:hocKi", async (req, res) => {
  const maLopHoc = req.params.maLopHoc;
  const hocKi = req.params.hocKi;

  let dsLHP = [];
  let tkb = [];
  let newTKB = [];
  let dsMonHoc = [];

  dsLHP = await LopHocPhan.find({ maLopHoc, hocKi, trangThai: { $ne: 0 } });
  if (dsLHP.length === 0) {
    return res
      .status(401)
      .json({ message: "ma Lop Hoc khong ton tai", status: 401, data: [] });
  }

  await asyncForEach(dsLHP, async (lhp, index) => {
    let maMonHoc = lhp.maDaoTao.slice(lhp.maDaoTao.length - 4);
    let tenMonHocVietTat = lhp.tenVietTatLopHocPhan.split("-")[1].trim();
    let maGiaoVien = "null";
    let tenGiaoVien = "null";
    await KHDT.findOne({ maDaoTao: lhp.maDaoTao }).then((khdt) => {
      DVHT = khdt.donViHocTrinh;
    });
    await GVLHP.findOne({
      maLopHocPhan: lhp.maLopHocPhan,
      trangThai: { $ne: 0 },
    }).then((gvlhp) => {
      if (gvlhp === null) {
        tenGiaoVien = "Chưa có GVLHP";
      } else {
        maGiaoVien = gvlhp.maGiaoVien;
      }
    });
    if (maGiaoVien !== "null") {
      await giaoVienDAO.layThongTinGiaoVien(maGiaoVien).then((gv) => {
        tenGiaoVien = gv[0].ho + " " + gv[0].ten;
      });
    }
    let tenMonHoc = tenMonHocVietTat + " - " + tenGiaoVien;
    dsMonHoc.push({ maMonHoc, tenMonHoc });
  });

  await TKB.findOne({ maLopHoc, hocKi }).then((yasuo) => {
    if (yasuo === null) {
      return res.json({
        status: 401,
        data: [],
        message: "lop hoc nay chua co tkb",
      });
    } else {
      tkb = yasuo.data;
    }
  });
  await asyncForEach(tkb, async (tiet) => {
    let temp = [];
    await asyncForEach(tiet, async (thu) => {
      if (thu !== "") {
        tmpMonHoc = dsMonHoc.find((mh) => mh.maMonHoc === thu);
        temp.push(tmpMonHoc.tenMonHoc);
      } else {
        temp.push("");
      }
    });
    newTKB.push(temp);
  });
  return res.json(newTKB);
});

router.get("/malophoc/:maLopHoc/hocki/:hocKi", async (req, res) => {
  const maLopHoc = req.params.maLopHoc;
  const arrayNull = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],

    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ];

  if (maLopHoc === "null") {
    return res.json({ TKB: arrayNull, tuanBatDau: 1, tuanKetThuc: 20 });
  }
  const hocKi = req.params.hocKi;

  await TKB.findOne({ maLopHoc, hocKi }).then((tkb) => {
    if (tkb === null) {
      return res.json({ TKB: arrayNull, tuanBatDau: 1, tuanKetThuc: 20 });
    } else {
      return res.json({
        TKB: tkb.data,
        tuanBatDau: tkb.tuanBatDau,
        tuanKetThuc: tkb.tuanKetThuc,
      });
    }
  });
});

router.post("/", async (req, res) => {
  const { hocKi, maLopHoc, data, tuanBatDau, tuanKetThuc } = req.body;

  await TKB.findOneAndUpdate(
    { maLopHoc, hocKi },
    { $set: { data, tuanBatDau, tuanKetThuc } }
  )
    .then((result) => {
      if (result !== null) {
        return res.json({
          status: 200,
          data: [],
          message: "Cap nhat thanh cong",
        });
      } else {
        const newTKB = new TKB({
          hocKi,
          maLopHoc,
          data,
          tuanBatDau,
          tuanKetThuc,
        });
        newTKB
          .save()
          .then(() => {
            return res.json({
              status: 200,
              data: [],
              message: "Them moi thanh cong",
            });
          })
          .catch((err) => {
            return res.json({
              status: 500,
              data: err,
              message: "Internal Server Error",
            });
          });
      }
    })
    .catch((err) => {
      return res.json({
        status: 500,
        data: err,
        message: "Internal Server Error",
      });
    });
});

router.get("/androidv2/malophoc/:maLopHoc/hocki/:hocKi", async (req, res) => {
  const maLopHoc = req.params.maLopHoc;
  const hocKi = req.params.hocKi;

  let dsLHP = [];
  let tkb = [];
  let newTKB = [];
  let dsPhanTu = [];

  dsLHP = await LopHocPhan.find({ maLopHoc, hocKi, trangThai: { $ne: 0 } });
  if (dsLHP.length === 0) {
    return res
      .status(401)
      .json({ message: "ma Lop Hoc khong ton tai", status: 401, data: [] });
  }
  console.log("tiep tuc");
  await asyncForEach(dsLHP, async (lhp, index) => {
    let phanTu = {};
    let maMonHoc = lhp.maDaoTao.slice(lhp.maDaoTao.length - 4);
    await MonHoc.findOne({ maMonHoc, trangThai: { $ne: 0 } }).then((mh) => {
      phanTu.maMonHoc = mh.maMonHoc;
      phanTu.tenMonHoc = mh.tenMonHoc;
      phanTu.LoaiMonHoc = mh.maLoaiMonHoc;
    });
    let maGiaoVien = "null";
    let tenGiaoVien = "null";
    await GVLHP.findOne({
      maLopHocPhan: lhp.maLopHocPhan,
      trangThai: { $ne: 0 },
    }).then((gvlhp) => {
      if (gvlhp === null) {
        tenGiaoVien = "Chưa có GVLHP";
      } else {
        maGiaoVien = gvlhp.maGiaoVien;
      }
    });
    if (maGiaoVien !== "null") {
      await giaoVienDAO.layThongTinGiaoVien(maGiaoVien).then((gv) => {
        tenGiaoVien = gv[0].ho + " " + gv[0].ten;
      });
    }
    phanTu.tenGiaoVien = tenGiaoVien;
    dsPhanTu.push(phanTu);
  });

  await TKB.findOne({ maLopHoc, hocKi }).then((yasuo) => {
    if (yasuo === null) {
      return res.json({
        status: 401,
        data: [],
        message: "lop hoc nay chua co tkb",
      });
    } else {
      tkb = yasuo.data;
    }
  });

  await asyncForEach(tkb, async (tiet) => {
    let temp = [];
    await asyncForEach(tiet, async (thu) => {
      if (thu !== "") {
        let tmpPhanTu = dsPhanTu.find((pt) => pt.maMonHoc === thu);
        temp.push(tmpPhanTu);
      } else {
        temp.push({});
      }
    });
    newTKB.push(temp);
  });
  return res.status(200).json({
    message: "Thanh cong",
    status: 200,
    data: newTKB,
  });
});

module.exports = router;
