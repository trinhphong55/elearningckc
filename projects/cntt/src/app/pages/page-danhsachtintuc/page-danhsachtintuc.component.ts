import { Component, OnInit } from '@angular/core';
import { TinTucCnttService } from '../../services/tintuc.service';
import * as moment from 'moment';

@Component({
  selector: 'app-page-danhsachtintuc',
  templateUrl: './page-danhsachtintuc.component.html',
  styleUrls: ['./page-danhsachtintuc.component.css']
})
export class PageDanhsachtintucComponent implements OnInit {
  cnttTinTuc: any = [];
  constructor(private tinTucCnttService: TinTucCnttService) { 
    this.loadTinTucCntt();
  }

  ngOnInit(): void {
  }
  loadTinTucCntt(){
    this.tinTucCnttService.loadTinTucCntt().subscribe(data => {
      this.cnttTinTuc = data.data;
    });
  }
  formatDatetime(time: string): string {
    time = moment(time).format('HH:mm, DD-MM-YYYY');
    return time;
  }
}
