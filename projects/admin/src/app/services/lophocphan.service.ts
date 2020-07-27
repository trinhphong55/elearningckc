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


  getLopHocPhan(): Observable<LopHocPhan[]> {
    return this.http.get<LopHocPhan[]>(this.lophocphanURL);
  }

  addDSLopHocPhan(maNTenLopHoc: Object[], hocKi: string): Observable<any> {
    return this.http.post<any>(this.lophocphanURL, [hocKi, maNTenLopHoc], httpOptions);
  }

  constructor(
    private http: HttpClient,
  ) { }
}
