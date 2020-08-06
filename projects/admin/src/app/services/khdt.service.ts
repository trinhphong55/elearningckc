import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KHDT } from '../interfaces/khdt.interface';

//Get data asynchronously with Observable
import { Observable, of } from 'rxjs';
import { CTDT } from '../interfaces/ctdt.interface';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class KHDTService {

  private khdtURL = "https://localhost:4100/api/khdt";
  constructor(
    private http: HttpClient ) {}

  getKHDTByHocKiNMaCTDT(maChuongTrinhDaoTao: string, hocKi: string): Observable<KHDT[]> {
    const url = `${this.khdtURL}/ctdt/${maChuongTrinhDaoTao}/hocki/${hocKi}`;
    return this.http.get<KHDT[]>(url);
  }

  addDSKHDT(ctdt: CTDT, dskhdt: KHDT[], hocKi: string): Observable<any> {
    return this.http.post<any>(this.khdtURL, { dskhdt, ctdt, hocKi } , httpOptions);
  }

}
