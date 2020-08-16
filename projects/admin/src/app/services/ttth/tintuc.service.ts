import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { ttthTinTuc } from '../../../models/ttthTinTuc';

@Injectable({
  providedIn: 'root',
})
export class TintucService {
  constructor(private http: HttpClient) {}

  private url = 'https://localhost:4100/api/ttthTinTuc';

  getTinTuc(): Observable<ttthTinTuc[]> {
    return this.http.get<ttthTinTuc[]>(this.url + '/ttthdanhsachtintuc');
  }

  addTinTuc(BaiViet: any): Observable<any> {
    return this.http.post<any>(this.url + '/ttththemtintuc', BaiViet);
  }

  suaTinTuc(BaiViet: any): Observable<any> {
    return this.http.post<any>(this.url + '/ttthsuatintuc', BaiViet);
  }

  xoaTinTuc(_id: string): Observable<any> {
    return this.http.post<any>(this.url + '/ttthxoatintuc', { _id: _id });
  }
}
