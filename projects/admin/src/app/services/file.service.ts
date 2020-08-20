import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const URL = "https://localhost:4100/api";


@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private _http: HttpClient) { }

  downloadFile(file: String) {
    var body = { filename: file };
    return this._http.post(`${URL}/template/download`, body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
