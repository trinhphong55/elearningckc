import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'https://localhost:4100/api/baidangfb';
const baseUrl2='https://localhost:4100/api/baidangfbv2';
const baseUrl3='https://localhost:4100/api/baidangfb/all';
const baseUrl4='https://localhost:4100/api/baidangfbraw';
@Injectable({
  providedIn: 'root'
})
export class BaiDangfbService {
    constructor(private http:HttpClient) { }
    getAll(){
        return this.http.get(baseUrl);
    }
    create(data) {
        return this.http.post(baseUrl3, data);
    }
    createDraw(data) {
        return this.http.post(baseUrl, data);
    }
    update(postID, data) {
        return this.http.put(`${baseUrl}/${postID}`, data);
    }
    updateDraw(id, data){
        return this.http.put(`${baseUrl4}/${id}`, data);
    }
    updateDrawtoPosted(id, data) {
        return this.http.put(`${baseUrl2}/${id}`, data);
    }
    delete(postID) {
        return this.http.delete(`${baseUrl}/${postID}`);
    }
    deleteDraw(id) {
        return this.http.delete(`${baseUrl4}/${id}`);
    }
}
