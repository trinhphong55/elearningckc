import { Component, OnInit } from '@angular/core';
import { TinTucCnttService } from '../../services/tintuc.service';
import * as moment from 'moment';

@Component({
  selector: 'app-page-danhsachthoikhoabieu',
  templateUrl: './page-danhsachthoikhoabieu.component.html',
  styleUrls: ['./page-danhsachthoikhoabieu.component.css']
})
export class PageDanhsachthoikhoabieuComponent implements OnInit {
  cnttTKB: any = [];
  constructor(private tinTucCnttService: TinTucCnttService) {
    this.loadTkbCntt()
  }

  ngOnInit(): void {
  }
  loadTkbCntt(){
    this.tinTucCnttService.loadTkbCntt().subscribe(data => {
      this.cnttTKB = data.data;
    });
  }
  formatDatetime(time: string): string {
    time = moment(time).format('HH:mm, DD-MM-YYYY');
    return time;
  }
}
