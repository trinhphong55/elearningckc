import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DanhmucService {
  constructor(private http: HttpClient) {}

  private API_URL = 'https://localhost:4100/api/danhmuc';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getDanhSachDanhMuc(): Observable<any> {
    return this.http
      .get<any>(this.API_URL, {
        headers: this.httpOptions.headers,
      })
      .pipe(retry(1), catchError(this.errorHandler));
  }

  saveNewDanhMuc(body: any): Observable<any> {
    return this.http
      .post<any>(this.API_URL, body, {
        headers: this.httpOptions.headers,
      })
      .pipe(retry(1), catchError(this.errorHandler));
  }

  saveEditDanhMuc(body: any): Observable<any> {
    return this.http
      .post<any>(this.API_URL + '/edit', body, {
        headers: this.httpOptions.headers,
      })
      .pipe(retry(1), catchError(this.errorHandler));
  }

  deleteDanhMuc(body: any): Observable<any> {
    return this.http
      .post<any>(this.API_URL + '/delete', body, {
        headers: this.httpOptions.headers,
      })
      .pipe(retry(1), catchError(this.errorHandler));
  }

  // Error handling
  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
