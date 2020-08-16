import { LopHocPhan } from './../models/lophocphan.interface';
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
export class LopHocPhanService {

  private lophocphanURL = "https://localhost:4100/api/lophocphan";

  getLopHocPhanbyCTDTandHocKi(maCTDT: string, hocKi: string): Observable<any> {
    const url = `${this.lophocphanURL}/ctdt/${maCTDT}/hocki/${hocKi}`;
    return this.http.get<LopHocPhan[]>(url);
  }

  getLopHocPhan(): Observable<LopHocPhan[]> {
    return this.http.get<LopHocPhan[]>(this.lophocphanURL);
  }

  addDSLopHocPhan(maNTenLopHoc: Object[], hocKi: string): Observable<any> {
    return this.http.post<any>(this.lophocphanURL, [hocKi, maNTenLopHoc], httpOptions);
  }
  layLopHocPhantheoMaLop(maLopHoc: string): Observable<LopHocPhan[]> {
    return this.http.get<any>(`${this.lophocphanURL}/${maLopHoc}/search`);
  }
  layLopHocPhanTheoMaLHP(maLopHocPhan: any) {
    return this.http.get<any>(`${this.lophocphanURL}/${maLopHocPhan}/malhp`);
  }

  layLopHocPhanCungGV(maLopHocPhan: number): Observable<LopHocPhan[]> {
    const url = `${this.lophocphanURL}/cunggiaovien/malophocphan/${maLopHocPhan}`;
    return this.http.get<LopHocPhan[]>(url);
  }
  constructor(
    private http: HttpClient,
  ) { }
}
