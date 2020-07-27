import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaiMonHoc } from '../interfaces/loaimonhoc.interface';

//Get data asynchronously with Observable
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaimonhocService {

  private loaimonhocURL = "https://localhost:4100/api/loaimonhoc";

  getLoaiMonHoc(): Observable<LoaiMonHoc[]> {
    return this.http.get<LoaiMonHoc[]>(this.loaimonhocURL);
  }

  constructor(
    private http: HttpClient,
  ) { }
}
