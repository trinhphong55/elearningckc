import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseUrl = 'https://localhost:4100/api/ct-diemsv-lophocphan';
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

  //cham diem
  chamDiem(id:any,diem:any){
    try {
      return this.http.put<any>(`${baseUrl}/${id}/chamdiem`,diem)
    } catch (error) {
      return error;
    }
  }
}
