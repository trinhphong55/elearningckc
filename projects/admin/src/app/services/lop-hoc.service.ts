import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';

const baseUrl = 'https://localhost:4100/api/lophoc';

@Injectable({
  providedIn: 'root',
})
export class LopHocService {
  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get(baseUrl);
  }
  //vd tienTo: 03006171
  filterLopTheoTienTo(tienTo: String) {
    return this.http.get(`${baseUrl}/${tienTo}/tiento`);
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
}
