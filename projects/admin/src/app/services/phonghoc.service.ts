import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PhongHoc } from '../interfaces/PhongHoc.interface';

//Get data asynchronously with Observable
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class PhonghocService {

  private _phongHocURL = "https://localhost:4100/api/phonghoc";

  getTatCaPhongHoc(): Observable<PhongHoc[]> {
    let url = `${this._phongHocURL}/laytatca`;
    return this._http.get<PhongHoc[]>(url);
  }

  getPhongHoc(): Observable<PhongHoc[]> {
    let url = `${this._phongHocURL}`;
    return this._http.get<PhongHoc[]>(url);
  }

  getOnePhongHoc(maPH: number): Observable<PhongHoc> {
    let url = `${this._phongHocURL}/getone/${maPH}`;
    return this._http.get<PhongHoc>(url);
  }

  addPhongHoc(ph: PhongHoc): Observable<any> {
    let url = `${this._phongHocURL}/them`;
    return this._http.post<PhongHoc>(url, ph, httpOptions);
  }

  constructor(
    private _http: HttpClient,) { }
}
