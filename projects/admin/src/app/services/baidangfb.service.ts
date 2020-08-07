import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'https://localhost:4100/api/baidangfb';
const baseUrl2='https://localhost:4100/api/baidangfbv2'
@Injectable({
  providedIn: 'root'
})
export class BaiDangfbService {
    constructor(private http:HttpClient) { }
    getAll(){
        return this.http.get(baseUrl);
    }
    create(data) {
        return this.http.post(baseUrl, data);
    }
    createDraw(data) {
        return this.http.post(baseUrl, data);
    }
    update(postID, data) {
        return this.http.put(`${baseUrl}/${postID}`, data);
    }
    updateDrawtoPosted(id, data) {
        return this.http.put(`${baseUrl2}/${id}`, data);
    }
    delete(id) {
        return this.http.delete(`${baseUrl}/${id}`);
    }
}