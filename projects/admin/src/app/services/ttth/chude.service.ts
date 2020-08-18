import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChuDeService {
  constructor(private http: HttpClient) {}

  private API_URL = 'https://localhost:4100/api/ttth/chude';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getDanhSachChuDe(): Observable<any> {
    return this.http
      .get<any>(this.API_URL, {
        headers: this.httpOptions.headers,
      })
      .pipe(retry(1), catchError(this.errorHandler));
  }

  saveNewChuDe(body: any): Observable<any> {
    return this.http
      .post<any>(this.API_URL, body, {
        headers: this.httpOptions.headers,
      })
      .pipe(retry(1), catchError(this.errorHandler));
  }

  saveEditChuDe(body: any): Observable<any> {
    return this.http
      .post<any>(this.API_URL + '/edit', body, {
        headers: this.httpOptions.headers,
      })
      .pipe(retry(1), catchError(this.errorHandler));
  }

  deleteChuDe(body: any): Observable<any> {
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
