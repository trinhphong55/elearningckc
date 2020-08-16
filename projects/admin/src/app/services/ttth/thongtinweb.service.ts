import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ttthThongTinWeb } from '../../../models/ttthThongTinWeb';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ThongtinwebService {

  constructor(private http: HttpClient) { }
  getThongTinWeb(): Observable<ttthThongTinWeb[]  >{
    return this.http.get<ttthThongTinWeb[] >('https://localhost:4100/api/ttthThongTinWeb/ttthdanhsachthongtinweb').pipe(
    );
  }
  suaThongTinWeb(updateThongTinWeb): Observable<any> {
    return this.http.post<any>('https://localhost:4100/api/ttthThongTinWeb/ttthsuathongtinweb', updateThongTinWeb, httpOptions).pipe(
    );
  }
}
