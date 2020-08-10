import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/Rx';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private _http: HttpClient) { }

	downloadFile(file: String) {
		var body = { filename: file };
		console.log(body);

		return this._http.post('https://localhost:4100/api/baitap/download', body, {
			responseType: 'blob',
			headers: new HttpHeaders().append('Content-Type', 'application/json')
		});
	}
}
