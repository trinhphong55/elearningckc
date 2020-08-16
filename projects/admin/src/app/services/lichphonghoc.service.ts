import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LPH } from '../interfaces/LichPhongHoc.interface';

//Get data asynchronously with Observable
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LichPhongHocService {

  private _lphURL = "https://localhost:4100/api/lichphonghoc";

  getbymaBacNkhoa(maBac: string, khoa: string): Observable<LPH[]> {
    let url = `${this._lphURL}/${maBac}/${khoa}`;
    return this._http.get<LPH[]>(url);
  }

  addLPH(lph: LPH[]): Observable<any> {
    let url = `${this._lphURL}/them`;
    return this._http.post<LPH[]>(url, lph, httpOptions);
  }

  constructor(
    private _http: HttpClient,) { }
}
