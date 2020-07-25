import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { cnttBaiViet } from '../../../models/cnttBaiViet'

@Injectable({
  providedIn: 'root'
})
export class cnttBaiVietService {

  baseUri: string = 'https://localhost:4100/api/cnttBaiViet';
  headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http: HttpClient) { }
  //taoTintuc
  taoTinTuc(baiViet: any): Observable<any> {
    let url = `${this.baseUri}/taoTinTuc`;
    return this.http.post<any>(url, JSON.stringify(baiViet))
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  danhSachTinTuc() {
    return this.http.get(`${this.baseUri}/danhsachbaiviet`);
  }
  //xoaTinTuc
  xoaTinTuc(id, data): Observable<any> {
    console.log("id: " + id)
    console.log("data: " + data)
    let url = `${this.baseUri}/xoabaiviet/${id}`;
    return this.http.post(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }
  //add tin tuc
  themTinTuc(data): Observable<any> {
    let url = `${this.baseUri}/taobaiviet`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

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
