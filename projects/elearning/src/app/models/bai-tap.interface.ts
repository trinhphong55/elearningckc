import { LopHocPhan } from './lophocphan.interface';


export interface BaiTap {
  maBaiTap?:string;
  tieuDe?: string,
  huongDan?: string,
  lopHocPhan?: any[],
  diem?: number,
  deadLine?: string,
  chuDeMoi?: string,
  chuDe?: string,
  file?: string[],
  tieuchiChamDiem?: string,
  ngayChinhSua?:any,
  ngayTao?:any,
  nguoiTao?:string,
  nguoiChinhSua?:string,
}
