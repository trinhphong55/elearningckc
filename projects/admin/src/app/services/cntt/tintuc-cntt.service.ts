import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TintucCnttService {
  baseUri: string = 'https://localhost:4100/api/cnttTinTuc';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}
  danhSachTinTuc(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUri}/danhsachtintuctheothutuhienthi`, {
        headers: this.headers,
      })
      .pipe(catchError(this.errorMgmt));
  }

  danhSachTinTucMoiNhat(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUri}/danhsachtintucmoinhat`, {
        headers: this.headers,
      })
      .pipe(catchError(this.errorMgmt));
  }

  danhSachTinTucAPI(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUri}/sharedanhsachbaiviet`, {
        headers: this.headers,
      })
      .pipe(catchError(this.errorMgmt));
  }

  danhSachTinTucSapXepTheoMaBaiViet(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUri}/danhsachtintuc`, {
        headers: this.headers,
      })
      .pipe(catchError(this.errorMgmt));
  }

  deleteTinTuc(body: any): Observable<any> {
    return this.http
      .post<any>(`${this.baseUri}/xoatintuc`, body, {
        headers: this.headers,
      })
      .pipe(catchError(this.errorMgmt));
  }

  kiemTraTrungMaBaiViet(maBaiViet: string): Observable<any> {
    return this.http
      .get(this.baseUri + '/maBaiViet=' + maBaiViet)
      .pipe(catchError(this.errorMgmt));
  }

  //add tin tuc
  themTinTuc(data): Observable<any> {
    let url = `${this.baseUri}/taotintuc`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  //edit tintuc
  editTinTuc(data): Observable<any> {
    return this.http
      .post<any>(this.baseUri + '/chinhSuaTinTuc', data)
      .pipe(catchError(this.errorMgmt));
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
    return throwError(errorMessage);
  }
}
