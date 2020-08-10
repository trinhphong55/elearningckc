const mongoose = require('mongoose');

const BaiTapSinhVienSchema = new mongoose.Schema({
    maSinhVien: {
        type: String,
        required: true
    },
    maBaiTap: {
        type: String,
        required: true
    },
    maLopHocPhan: {
        type: String,
        required: true,
    },
    tieuDe: {
        type: String,
        trim: true,
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
