import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ttthtintuc } from '../../../models/ttthtintuc';
@Injectable({
  providedIn: 'root'
})
export class TintucService {

  constructor() { }
}
