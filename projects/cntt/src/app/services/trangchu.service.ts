import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TrangChuService {
  constructor(private http: HttpClient) {}

  // API URL
  private API_URL = 'https://localhost:4100/api/cntt';

  // HTTP HEADERS
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getDataCanHienThiLenTrangChu(): Observable<any> {
    return this.http
      .get<any>(this.API_URL + '/all', { headers: this.httpOptions.headers })
      .pipe(retry(1), catchError(this.errorHandler));
  }

  // Error handling
  private errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
