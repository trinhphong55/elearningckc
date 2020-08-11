interface LHP {
  tenLopHocPhan: string,
  maLopHocPhan: string,
}

export interface BaiTap {
  tieuDe: string,
  huongDan: string,
  lopHocPhan?: string,
  diem: number,
  deadLine: string,
  chuDeMoi?: string,
  chuDe?: string,
  file?: string[],
  tieuchiChamDiem?: string,
}
