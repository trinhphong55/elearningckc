import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Get data asynchronously with Observable
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ThoikhoabieuService {

  private tkbURL = "https://localhost:4100/api/tkb";

  getTKBbymaLopHocNhocKi(maLopHoc: string, hocKi: number): Observable<any> {
    let url = `${this.tkbURL}/malophoc/${maLopHoc}/hocki/${hocKi}`;
    return this.http.get<any>(url);
  }


  addTKB(maLopHoc: string, hocKi: number, data: [], tuanBatDau: number, tuanKetThuc: number): Observable<any> {
    return this.http.post<any>(this.tkbURL, { maLopHoc, hocKi, data, tuanBatDau, tuanKetThuc }, httpOptions);
  }

  constructor(
    private http: HttpClient ) {}
}
