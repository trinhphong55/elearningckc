import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Get data asynchronously with Observable
import { Observable, of } from 'rxjs';
import { LopHocPhan } from '../interfaces/lophocphan.interface';

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

  getLopHocPhanbyMaLopHocPhan(maLopHocPhan: number): Observable<LopHocPhan> {
    let url = `${this.lophocphanURL}/malophocphan/${maLopHocPhan}`;
    return this.http.get<LopHocPhan>(url);
  }

  addDSLopHocPhan(maNTenLopHoc: Object[], hocKi: string): Observable<any> {
    return this.http.post<any>(this.lophocphanURL, [hocKi, maNTenLopHoc], httpOptions);
  }
  layLopHocPhantheoMaLop(maLopHoc:string):Observable<LopHocPhan[]>{
    return this.http.get<any>(`${this.lophocphanURL}/${maLopHoc}/search`);
  }

  //lay lop hoc phan theo mssv(trinhphong)
  getLopHocPhanbyMssv(maSinhVien: string): Observable<LopHocPhan> {
    let url = `${this.lophocphanURL}/${maSinhVien}/sinhvien`;
    return this.http.get<LopHocPhan>(url);
  }

  /// //lay lop hoc phan theo email(trinhphong)
  getLopHocPhanbyemail(email: string): Observable<LopHocPhan> {
    let url = `${this.lophocphanURL}/${email}/giaovienlophocphan`;
    return this.http.get<LopHocPhan>(url);
  }
  getLopHocPhanbyemailSinhvien(email: string): Observable<LopHocPhan> {
    let url = `${this.lophocphanURL}/${email}/sinhvienlophocphan`;
    return this.http.get<LopHocPhan>(url);
  }
  constructor(
    private http: HttpClient,
  ) { }
}
