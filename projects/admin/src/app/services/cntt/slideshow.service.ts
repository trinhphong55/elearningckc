import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SlideshowService {
  // API URL
  private API_URL = 'https://localhost:4100/api/slideshow';

  // HTTP HEADERS
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getDanhSachSlideShow(): Observable<any> {
    return this.http
      .get<any>(this.API_URL)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  saveNewSlideShow(formData: FormData): Observable<any> {
    return this.http
      .post<any>(this.API_URL + '/save', formData)
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
