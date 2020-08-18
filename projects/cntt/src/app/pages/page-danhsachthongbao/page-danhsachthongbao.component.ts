import { Component, OnInit } from '@angular/core';
import { TinTucCnttService } from '../../services/tintuc.service';
import * as moment from 'moment';

@Component({
  selector: 'app-page-danhsachthongbao',
  templateUrl: './page-danhsachthongbao.component.html',
  styleUrls: ['./page-danhsachthongbao.component.css']
})
export class PageDanhsachthongbaoComponent implements OnInit {
  cnttThongBao: any = [];
  constructor(private tinTucCnttService: TinTucCnttService) {
    this.loadThongBaoCntt()
  }

  ngOnInit(): void {
  }
  loadThongBaoCntt(){
    this.tinTucCnttService.loadThongBaoCntt().subscribe(data => {
      this.cnttThongBao = data.data;
    });
  }
  formatDatetime(time: string): string {
    time = moment(time).format('HH:mm, DD-MM-YYYY');
    return time;
  }
}
