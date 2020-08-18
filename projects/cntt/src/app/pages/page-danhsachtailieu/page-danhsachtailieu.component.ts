import { Component, OnInit } from '@angular/core';
import { TinTucCnttService } from '../../services/tintuc.service';
import * as moment from 'moment';

@Component({
  selector: 'app-page-danhsachtailieu',
  templateUrl: './page-danhsachtailieu.component.html',
  styleUrls: ['./page-danhsachtailieu.component.css']
})
export class PageDanhsachtailieuComponent implements OnInit {
  cnttTaiLieu: any = [];
  constructor(private tinTucCnttService: TinTucCnttService) {
    this.loadTaiLieuCntt()
  }

  ngOnInit(): void {
  }
  loadTaiLieuCntt(){
    this.tinTucCnttService.loadTaiLieuCntt().subscribe(data => {
      this.cnttTaiLieu = data.data;
    });
  }
  formatDatetime(time: string): string {
    time = moment(time).format('HH:mm, DD-MM-YYYY');
    return time;
  }

}
