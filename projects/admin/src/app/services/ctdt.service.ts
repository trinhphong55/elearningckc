import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CTDT } from '../interfaces/ctdt.interface';

//Get data asynchronously with Observable
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CTDTService {

  private ctdtURL = "https://localhost:4100/api/ctdt";

  constructor(
    private http: HttpClient
  ) {}


  getCTDTByMaChuongTrinhDaoTao(maChuongTrinhDaoTao: string): Observable<CTDT> {
    const url = `${this.ctdtURL}/${maChuongTrinhDaoTao}`;
    return this.http.get<CTDT>(url);
  }

  getOneCTDT(): Observable<CTDT> {
    const url = `${this.ctdtURL}/get/one`;
    return this.http.get<CTDT>(url);
  }

}
