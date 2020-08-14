import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/Rx';
// import { Observable } from 'rxjs';
const URL = "https://localhost:4100/api";
@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private _http: HttpClient) { }

  downloadFile(file: String) {
    var body = { filename: file };
    return this._http.post(`${URL}/baitap/download`, body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  downloadFileBaiGiang(file: String) {
    var body = { filename: file };
    return this._http.post(`${URL}/baigiang/download`, body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  exportExcelTKB(maLopHoc: string, tenLopHoc: string, hocKi: number) {
    return this._http.post(`${URL}/tkb/exportexcel`, { maLopHoc, tenLopHoc, hocKi }, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
