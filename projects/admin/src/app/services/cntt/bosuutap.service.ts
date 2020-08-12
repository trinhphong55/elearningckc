import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { cnttBoSuuTap } from '../../../models/cnttBoSuuTap'

@Injectable({
  providedIn: 'root'
})
export class CnttBoSuuTapService {

  baseUri: string = 'https://localhost:4100/api/cnttbosuutap';

  constructor(private http: HttpClient) { }
  danhSachItemBST(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUri}/danhsachbst`, {
      })
      .pipe(catchError(this.errorMgmt));
  }
  deleteItemBST(body: any): Observable<any> {
    return this.http
      .post<any>(`${this.baseUri}/xoabst`, body)
      .pipe(catchError(this.errorMgmt));
  }
  onSave(formData: FormData): Observable<any> {
    return this.http
      .post(this.baseUri + '/taobst', formData)
      .pipe(catchError(this.errorMgmt));
  }
  //   //edit tintuc
  // editItemTienIch(data): Observable<cnttBoSuuTap> {
  //   return this.http
  //     .post<cnttBoSuuTap>(this.baseUri + '/chinhsuabst', data)
  //     .pipe(catchError(this.errorMgmt));
  // }
  editItemTienIch(formData: FormData): Observable<any> {
    return this.http
      .post(this.baseUri + '/chinhsuabst', formData)
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
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
