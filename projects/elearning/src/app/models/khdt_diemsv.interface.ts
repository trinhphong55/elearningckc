import { DiemSinhVien } from './diemsv.interface';
export interface KHDT_DiemSinVien {
  donViHocTrinh: number,
  soTietHoc: number,
  soTuan: number,
  hocKi: number,
  loaiTienThu: string,
  tinh: boolean,
  xet: boolean,
  maDaoTao: any,
  maChuongTrinhDaoTao: string,
  maMonHoc: string,
  tenMonHoc:string,
  maBoMon: string,
  diemSinhVien:DiemSinhVien,
}
