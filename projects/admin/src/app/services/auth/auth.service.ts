import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor (private httpClient: HttpClient) {}

  login(user: any){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.httpClient
      .post<any>(
        'https://localhost:4100/api/login',
        user,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured: ', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later');
  }
}
