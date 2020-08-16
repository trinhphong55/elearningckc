import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { GiaoVien } from '../../models/giaoVien';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  // themGiaoVien
  themGiaoVien(giaoVien: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .post<any>(
        'https://localhost:4100/api/giaovien/them-giao-vien',
        JSON.stringify(giaoVien),
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  capNhatGiaoVien(giaoVien: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .post<any>(
        'https://localhost:4100/api/giaovien/cap-nhat-giao-vien',
        JSON.stringify(giaoVien),
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  capNhatBoMon(maGV:string, maBoMon:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .post<any>(
        'https://localhost:4100/api/giaovien/cap-nhat-bo-mon',
        {maGV, maBoMon},
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  setTrangThai(maGiaoVien: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    let url = `https://localhost:4100/api/giaovien/setTrangThai/${maGiaoVien}`;
    return this.http.put<any>(url, "", httpOptions);
  }

  layDanhSachGiaoVienTheoTrangThai(trangThai: any): Observable<GiaoVien[]>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .get<GiaoVien[]>(
        `https://localhost:4100/api/giaovien/danh-sach-giao-vien-theo-trang-thai/${trangThai}`,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  layDanhSachGiaoVien(): Observable<GiaoVien[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .get<GiaoVien[]>(
        'https://localhost:4100/api/giaovien/danh-sach-giao-vien',
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  layMaGVMoiNhat(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .get<any>(
        'https://localhost:4100/api/giaovien/lay-ma-gv-moi-nhat',
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  xoaGiaoVien(maGiaoVien: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .post<any>(
        'https://localhost:4100/api/giaovien/xoa-giao-vien',
        maGiaoVien,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  layThongTinGiaoVien(maGiaoVien: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .post<any>(
        'https://localhost:4100/api/giaovien/thong-tin-giao-vien',
        maGiaoVien,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  themDSGiaoVienExcel(dsGiaoVienExcel: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .post<any>(
        'https://localhost:4100/api/giaovien/them-giao-vien-excel',
        dsGiaoVienExcel,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

///dsgv
  layDanhSachGiaoVienByemail(email:any): Observable<any> {

    return this.http
      .get<GiaoVien[]>(
        'https://localhost:4100/api/giaovien/thong-tin-giao-vien-email/'+email,
      )

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
