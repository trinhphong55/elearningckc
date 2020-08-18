import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MonHoc } from '../interfaces/monhoc.interface';

//Get data asynchronously with Observable
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MonhocService {

  private monHocURL = "https://localhost:4100/api/monhoc";
  constructor(
    private http: HttpClient ) {}

  getMonHoc(): Observable<MonHoc[]> {
    return this.http.get<MonHoc[]>(this.monHocURL);
  }

  getMonHocbyTrangThai(trangThai: number): Observable<any> {
    let url = `${this.monHocURL}/trangthai/${trangThai}`;
    return this.http.get<any>(url);
  }

  getDSMonHocbymaLopHocNhocKi(maLopHoc: string, hocKi: number): Observable<MonHoc[]> {
    let url = `${ this.monHocURL }/malophoc/${ maLopHoc }/hocki/${ hocKi }`;
    return this.http.get<MonHoc[]>(url);
  }

  //Import MonHoc from Excel
  importMonHocFromExcel(monHoc: MonHoc[]): Observable<any> {
    return this.http.post<MonHoc[]>(this.monHocURL + "/importexcel", monHoc, httpOptions);
  }

  //Lay 1 mon hoc
  getMonHocFromMaMonHoc(maMonHoc: string): Observable<MonHoc> {
    const url = `${this.monHocURL}/${maMonHoc}`;
    return this.http.get<MonHoc>(url);
  }

  //Them moi 1 mon hoc
  addMonHoc(monHoc: MonHoc): Observable<any> {
    return this.http.post<any>(this.monHocURL, monHoc, httpOptions);
  }

  //Cap nhat 1 mon hoc
  updateMonHoc(monHoc: MonHoc): Observable<any> {
    return this.http.put<any>(`${this.monHocURL}/${monHoc.maMonHoc}`, monHoc, httpOptions);
  }

  //Set trang thai 1 mon hoc
  setTrangThai(maMonHoc: string): Observable<any> {
    let url = `${this.monHocURL}/settrangthai/${maMonHoc}`;
    return this.http.put<any>(url, "", httpOptions);
  }
  //Xoa 1 mon hoc
  deleteMonHoc(maMonHoc: string): Observable<any> {
    return this.http.delete(`${this.monHocURL}/${maMonHoc}`, httpOptions);
  }
}
