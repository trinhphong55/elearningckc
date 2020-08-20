import { CTDT } from '../models/ctdt.interface';
import { KHDT_DiemSinVien } from '../models/khdt_diemsv.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Get data asynchronously with Observable
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class KHDTService {
  private khdtURL = 'https://localhost:4100/api/khdt';
  constructor(private http: HttpClient) {}
  getAll(){
    return this.http.get<any>(this.khdtURL, httpOptions);
  }
  layCTDT_theoMaSV(maSV){
    return this.http.get<any>(this.khdtURL+'/'+maSV, httpOptions);
  }
  getKHDTByHocKiNMaCTDT(
    maChuongTrinhDaoTao: string,
    hocKi: string
  ): Observable<KHDT_DiemSinVien[]> {
    const url = `${this.khdtURL}/ctdt/${maChuongTrinhDaoTao}/hocki/${hocKi}`;
    return this.http.get<KHDT_DiemSinVien[]>(url);
  }

  addDSKHDT(ctdt: CTDT, dskhdt: KHDT_DiemSinVien[]): Observable<any> {
    return this.http.post<any>(this.khdtURL, [ctdt, dskhdt], httpOptions);
  }
}
