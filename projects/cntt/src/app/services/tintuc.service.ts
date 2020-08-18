import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TinTucCnttService {
  baseUri: string = 'https://localhost:4100/api/cnttTinTuc';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}
  loadTinTuc(id): Observable<any> {
    let url = `${this.baseUri}/tintuc/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }
  loadTinTucKhac(): Observable<any> {
    let url = `${this.baseUri}/danhsachtintuckhac`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }
  loadTinTucNoiBat(): Observable<any> {
    let url = `${this.baseUri}/tintucnoibatcntt`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  loadTinTucMoiNhat(): Observable<any> {
    let url = `${this.baseUri}/tintucmoinhat`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  loadTinTucCntt(): Observable<any> {
    let url = `${this.baseUri}/danhsachtintuccntt`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }
  loadThongBaoCntt(): Observable<any> {
    let url = `${this.baseUri}/danhsachthongbaocntt`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }
  loadTaiLieuCntt(): Observable<any> {
    let url = `${this.baseUri}/danhsachtailieucntt`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }
  loadTkbCntt(): Observable<any> {
    let url = `${this.baseUri}/danhsachtkbcntt`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }
  loadJobCntt(): Observable<any> {
    let url = `${this.baseUri}/danhsachjobcntt`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }
  searchTinTuc(query: string): Observable<any> {
    return this.http
      .get(this.baseUri + '/search=' + query)
      .pipe(retry(1), catchError(this.errorMgmt));
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
