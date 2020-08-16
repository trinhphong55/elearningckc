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
}
