import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CrawlingService {
  // API URL
  private API_URL = 'https://localhost:4100/api/crawling';

  // HTTP HEADERS
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getDanhSachBaiVietDaCrawled(): Observable<any> {
    return this.http
      .get<any>(this.API_URL, {
        headers: this.httpOptions.headers,
      })
      .pipe(retry(1), catchError(this.errorHandler));
  }

  getDanhSachBaiViet(selector: object): Observable<any> {
    return this.http
      .post<any>(this.API_URL, selector, {
        headers: this.httpOptions.headers,
      })
      .pipe(retry(1), catchError(this.errorHandler));
  }

  saveBaiViet(body: object): Observable<any> {
    return this.http
      .post<any>(this.API_URL + '/save', body, {
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
