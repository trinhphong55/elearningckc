import { Component, OnInit } from '@angular/core';
import { TinTucCnttService } from '../../services/tintuc.service';
import * as moment from 'moment';
@Component({
  selector: 'app-page-job',
  templateUrl: './page-job.component.html',
  styleUrls: ['./page-job.component.css']
})
export class PageJobComponent implements OnInit {

  cnttVieclam: any = [];
  constructor(private tinTucCnttService: TinTucCnttService) {
    this.loadJobCntt()
  }

  ngOnInit(): void {
  }
  loadJobCntt(){
    this.tinTucCnttService.loadJobCntt().subscribe(data => {
      this.cnttVieclam = data.data;
    });
  }
  formatDatetime(time: string): string {
    time = moment(time).format('HH:mm, DD-MM-YYYY');
    return time;
  }

}
