import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseUrl = 'https://localhost:4100/api/cotdiemlophocphan';
@Injectable({
  providedIn: 'root'
})

export class CotDiemLopHocPhanService  {

  constructor(private http:HttpClient) { }
  //lay cot diem theo ma lop hoc phan
  layCotDiemByMaLopHP(maLopHOcPhan:any) {
    return this.http.get(`${baseUrl}/${maLopHOcPhan}`);
  }
}
