import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';

const baseUrl = 'https://localhost:4100/api/sinhvien';
@Injectable({
  providedIn: 'root'
})

export class SinhVienService  {

  constructor(private http:HttpClient) { }
  getAll() {
    return this.http.get(baseUrl);
  }

}
