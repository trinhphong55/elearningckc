import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class TimeCommonService {
  constructor() {}

  formatDateTime(time: string, format: string = 'HH:mm, DD-MM-YYYY'): string {
    time = moment(time).format(format);
    return time;
  }
}
