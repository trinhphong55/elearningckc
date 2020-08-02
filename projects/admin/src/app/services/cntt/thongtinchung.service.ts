import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ThongTinChungService {
  constructor(private httpClient: HttpClient) {}
  // API URL
  private API_URL = 'https://localhost:4100/api/thongtinchung';

  // HTTP HEADERS
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getThongTinChung(): Observable<any> {
    return this.httpClient
      .get(this.API_URL)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  onSave(formData: FormData): Observable<any> {
    return this.httpClient
      .post(this.API_URL + '/save', formData)
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
