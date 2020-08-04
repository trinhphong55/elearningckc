import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HeaderFooterService {
  constructor(private httpClient: HttpClient) {}

  // API URL
  private API_URL = '  https://localhost:4100/api/';

  getHeader(): Observable<any> {
    return this.httpClient
      .get<any>(this.API_URL + 'cnttHeader')
      .pipe(retry(1), catchError(this.errorHandler));
  }

  getFooter(): Observable<any> {
    return this.httpClient
      .get<any>(this.API_URL + 'cnttFooter')
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
