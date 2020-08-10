import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'https://localhost:4100/api/pagefb';
@Injectable({
  providedIn: 'root'
})

export class PagefbService {
    constructor(private http:HttpClient) { }
    getAll(){
        return this.http.get(baseUrl);
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
}
