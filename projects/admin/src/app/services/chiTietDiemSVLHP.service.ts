import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const baseUrl = 'https://localhost:4100/api/ct-diemsv-lophocphan';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})

export class chiTietDiemSVLopHocPhanService  {

  constructor(private http:HttpClient) { }
  //lay ct diem sv dua vao maHoc phan
  layCotDiemByMaLopHP(maLopHocPhan:any) {
    return this.http.get(`${baseUrl}/${maLopHocPhan}/lophocphan`);
  }
  //
  layDanhSachSvChamDiemTheoMaCotDiem(maCotDiem:any) {
    return this.http.get(`${baseUrl}/${maCotDiem}/sinhvienlophocphan`);
  }
  //thong tin xuat excel
  xuatThongTinExcel(maCotDiem:any) {
    return this.http.get(`${baseUrl}/${maCotDiem}/exportexcel`);
  }
  //cham diem
  chamDiem(id:any,diem:any){
    try {
      return this.http.put<any>(`${baseUrl}/${id}/chamdiem`,diem)
    } catch (error) {
      return error;
    }
  }

  ///EXCEL;
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  //nhap tt excel
  NhapThongTinExcel(maCotDiem:any,thongtin:any) {
    return this.http.post(`${baseUrl}/${maCotDiem}/importexcel`,thongtin);
  }

}
