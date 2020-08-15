import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObservableInput } from 'rxjs';

const baseUrl = 'https://localhost:4100/api/bomon';

@Injectable({
  providedIn: 'root'
})
export class BomonService {

  constructor(private http:HttpClient) { }
  getAll() {
    return this.http.get(baseUrl);
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
