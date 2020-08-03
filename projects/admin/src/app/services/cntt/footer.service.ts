import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FooterService {
  // API URL
  private API_URL = 'https://localhost:4100/api/cnttFooter';

  // HTTP HEADERS
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getFooter(): Observable<any> {
    return this.http
      .get<any>(this.API_URL)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  saveFooter(data: any): Observable<any> {
    return this.http
      .post<any>(this.API_URL, data)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  // Error handling q
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
