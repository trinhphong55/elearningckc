import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ttthTinTuc } from '../models/ttthTinTuc';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class TintucService {

  constructor(private http: HttpClient) { }
  getTinTucChinh(): Observable<ttthTinTuc[]  >{
    return this.http.get<ttthTinTuc[] >('https://localhost:4100/api/ttthTinTuc/tintucchinh').pipe(
    );
  }
  getTinTucPhu(): Observable<ttthTinTuc[]  >{
    return this.http.get<ttthTinTuc[] >('https://localhost:4100/api/ttthTinTuc/tintucphu').pipe(
    );
  }
}
