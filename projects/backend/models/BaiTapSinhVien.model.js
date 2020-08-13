const mongoose = require('mongoose');

const BaiTapSinhVienSchema = new mongoose.Schema({
    email: {
        type: String,
        default: "null",
    },
    maBaiTap: {
        type: String,
        default: "null",
    },
    maLopHocPhan: {
        type: String,
        default: "null",
    },
    tieuDe: {
        type: String,
        default: "null",
    },
    deadLine: {
        type: String,
        default: "null",
    },
    file: {
        type: [],
        default: [],
    },
    chuDe: {
        type: String,
        default: "null",
    },
    nguoiTao: {
        type: String,
        default: "phong",
    },
    nguoiChinhSua: {
        type: String,
        default: "phong",
    },
    ngayChinhSua: {
        type: Date,
        default: Date.now,
    },
    trangThai: {
        type: Number,
        default: 1,
    },
    ngayTao: {
        type: Date,
        default: Date.now,
    },
});

const BaiTapSinhVien = mongoose.model('BaiTapSinhVien', BaiTapSinhVienSchema, 'BaiTapSinhVien');

module.exports = BaiTapSinhVien;
