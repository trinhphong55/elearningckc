import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { cnttBoSuuTap } from '../../../models/cnttBoSuuTap'

@Injectable({
  providedIn: 'root'
})
export class CnttBoSuuTapService {

  baseUri: string = 'https://localhost:4100/api/cnttbosuutap';
  headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http: HttpClient) { }
  danhSachBST(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUri}/danhsachbst`, {
        headers: this.headers,
      })
      .pipe(catchError(this.errorMgmt));
  }
//   deleteTienIch(body: any): Observable<any> {
//     return this.http
//       .post<any>(`${this.baseUri}/xoatienich`, body, {
//         headers: this.headers,
//       })
//       .pipe(catchError(this.errorMgmt));
//   }
//   themTienIch(data): Observable<any> {
//     let url = `${this.baseUri}/taotienich`;
//     return this.http.post(url, data)
//       .pipe(
//         catchError(this.errorMgmt)
//       )
//   }
//   //edit tintuc
//   editTienIch(data): Observable<cnttTienIchSinhVien> {
//     return this.http
//       .post<cnttTienIchSinhVien>(this.baseUri + '/chinhSuaTienIch', data, {
//         headers: this.headers,
//       })
//       .pipe(catchError(this.errorMgmt));
//   }
  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
