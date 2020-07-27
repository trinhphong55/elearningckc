import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseUrl = "https://localhost:4100/api/loaidonvi";
@Injectable({
  providedIn: 'root'
})
export class LoaidonviService {

  constructor(private http:HttpClient) { }
  getAll() {
    return this.http.get(baseUrl);
  }
}
