import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ttthKhoaHoc } from '../models/ttthKhoaHoc';
import { catchError, map, retry } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class KhoahocService {
  baseUri: string = 'https://localhost:4100/api/ttthKhoaHoc';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
  get(): Observable<ttthKhoaHoc[]  >{
    return this.http.get<ttthKhoaHoc[] >('https://localhost:4100/api/ttthKhoaHoc/').pipe(
    );
  }
  getChiTietKhoaHoc(id): Observable<any> {
    let url = `${this.baseUri}/khoahoc/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }
  getKhoaHocKhac(): Observable<any> {
    let url = `${this.baseUri}/khoahocttthkhac`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }
  getAllKhoaHoc(): Observable<any> {
    let url = `${this.baseUri}/khoahocttth`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }
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
