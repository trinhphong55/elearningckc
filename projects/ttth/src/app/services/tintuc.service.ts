import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ttthTinTuc } from '../models/ttthTinTuc';
import { catchError, map, retry } from 'rxjs/operators';
// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };
@Injectable({
  providedIn: 'root'
})
export class TintucService {
  baseUri: string = 'https://localhost:4100/api/ttthTinTuc';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }
  getTinTucChinh(): Observable<ttthTinTuc[]  >{
    return this.http.get<ttthTinTuc[] >('https://localhost:4100/api/ttthTinTuc/tintucchinh').pipe(
    );
  }
  getTinTucPhu(): Observable<ttthTinTuc[]  >{
    return this.http.get<ttthTinTuc[] >('https://localhost:4100/api/ttthTinTuc/tintucphu').pipe(
    );
  }
  getChiTietTinTuc(id): Observable<any> {
    let url = `${this.baseUri}/tintucttth/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }
  getChiTietTinKhac(): Observable<any> {
    let url = `${this.baseUri}/tintucttthkhac`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }
  getAllTinTuc(): Observable<any> {
    let url = `${this.baseUri}/tintucttth`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  getDanhSachTinTucTheoChuDe(chuDe: string): Observable<any> {
    let url = `${this.baseUri}/chude=${chuDe}`;
    return this.http.get(url, { headers: this.headers }).pipe(catchError(this.errorMgmt));
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
