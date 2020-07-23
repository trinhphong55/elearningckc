import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map,retry } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { cnttTinTuc } from '../../../models/cnttTinTuc'

@Injectable({
  providedIn: 'root'
})
export class TintucCnttService {

  baseUri: string = 'https://localhost:4100/api/cnttTinTuc';
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  
  constructor(private http: HttpClient) { }
  //taoTintuc
  taoTinTuc(tinTuc: any): Observable<any> {
    let url = `${this.baseUri}/taoTinTuc`;
    return this.http.post<any>(url, JSON.stringify(tinTuc))
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  danhSachTinTuc() {
    return this.http.get(`${this.baseUri}/danhsachtintuc`);
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
