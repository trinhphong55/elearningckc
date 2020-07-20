import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { GiaoVien } from '../../models/giaoVien';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class ApiService{
    constructor(private http: HttpClient) { }
    // themGiaoVien
    themGiaoVien(giaoVien: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };
        return this.http.post<any>("http://localhost:4100/api/giaovien/them-giao-vien", JSON.stringify(giaoVien), httpOptions)
        .pipe(
            catchError(this.handleError)
        );
    }
    layDanhSachGiaoVien(): Observable<GiaoVien[]> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };
        return this.http.get<GiaoVien[]>("http://localhost:4100/api/giaovien/danh-sach-giao-vien", httpOptions)
        .pipe(
            catchError(this.handleError)
        );
    }

    layMaGVMoiNhat(): Observable<any>{
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      };
      return this.http.get<any>("http://localhost:4100/api/giaovien/lay-ma-gv-moi-nhat", httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    }

    xoaGiaoVien(maGiaoVien:any):Observable<any>{
      console.log('xoaGiaoVien', maGiaoVien);
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      };
      return this.http.post<any>("http://localhost:4100/api/giaovien/xoa-giao-vien", maGiaoVien, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    }
    private handleError(error: HttpErrorResponse) {
        if(error.error instanceof ErrorEvent){
            console.error('An error occured: ', error.error.message);
        }
        else {
            console.error(
                `Backend returned code ${error.status}, ` + `body was: ${error.error}`
            );
        }
        return throwError(
            'Something bad happened; please try again later'
        );
    }
}
