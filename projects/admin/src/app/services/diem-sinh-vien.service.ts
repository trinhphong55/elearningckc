import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseUrl = 'https://localhost:4100/api/diemsinhvien';
@Injectable({
  providedIn: 'root'
})

export class DiemSinhVienService  {

  constructor(private http:HttpClient) { }
  getAllFor(maSinhvien) {
    return this.http.get(`${baseUrl}/${maSinhvien}/search`);
  }

}
