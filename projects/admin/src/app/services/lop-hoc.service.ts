import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { LopHoc } from '../interfaces/LopHoc.interface'
const baseUrl = 'https://localhost:4100/api/lophoc';

@Injectable({
  providedIn: 'root',
})
export class LopHocService {
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get(baseUrl);
  }
  //vd tienTo: 03006171
  filterLopTheoTienTo(tienTo: String) {
    return this.http.get<any>(`${baseUrl}/${tienTo}/tiento`).pipe(map(resData => {
      return resData;
    }));
  }
  getAllFormanghanh(maNganh) {
    return this.http.get(`${baseUrl}/${maNganh}/searchnganh`);
  }
  getAllForkhoa(khoa) {
    return this.http.get(`${baseUrl}/${khoa}/searchkhoa`);
  }
  xoaTheoTienTo(tiento:string) {
    return this.http.delete(`${baseUrl}/${tiento}/tiento`);
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
<<<<<<< HEAD
  updateFB(id, data) {
    return this.http.put(`${baseUrl}/${id}/facebook`, data);
  }
=======



>>>>>>> master
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
