import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaiTap } from '../interfaces/BaiTap.inteface';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BaiTapService {

  private baiTapURL = "https://localhost:4100/api/baitap";

  addBaiTap(baitap: BaiTap): Observable<any> {
    return this.http.post<any>(this.baiTapURL, baitap, httpOptions);
  }
  public layDS_theoLopHocPhan(maLopHocPhan){
    return this.http.get<any>(this.baiTapURL + `/${maLopHocPhan}/lop-hoc-phan`, httpOptions);
  }
  public layBaiTap_theoMaBaiTap(maBaiTap){
    return this.http.get<any>(this.baiTapURL + `/${maBaiTap}`, httpOptions);
  }
  constructor(
    private http: HttpClient ) {}
}
