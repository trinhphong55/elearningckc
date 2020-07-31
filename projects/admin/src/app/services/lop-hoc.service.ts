import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
<<<<<<< HEAD
import { LopHoc } from '../interfaces/LopHoc.interface'
=======

>>>>>>> 48e1195e2d5a2376092bcac7947d3ffed6ea278e
const baseUrl = 'https://localhost:4100/api/lophoc';

@Injectable({
  providedIn: 'root',
})
export class LopHocService {
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get(baseUrl);
  }
  getAllFor(maNganh) {
    return this.http.get(`${baseUrl}/${maNganh}/search`);
  }
  getAllFormanghanh(maNganh) {
    return this.http.get(`${baseUrl}/${maNganh}/searchnganh`);
  }
  getAllForkhoa(khoa) {
    return this.http.get(`${baseUrl}/${khoa}/searchkhoa`);
  }
  deleteMaNganh(maNganh) {
    return this.http.delete(`${baseUrl}/${maNganh}/search`);
  }
  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data) {
    return this.http.post(baseUrl, data);
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll() {
    return this.http.delete(baseUrl);
  }
  //trinhphong
  getMaBac(maBac) {

    return this.http.get<LopHoc>(`${baseUrl}/${maBac}`);
  }
}
