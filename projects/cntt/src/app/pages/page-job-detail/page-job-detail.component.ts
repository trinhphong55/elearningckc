import { Component, OnInit } from '@angular/core';
import { TinTucCnttService } from '../../services/tintuc.service';
import * as moment from 'moment';

@Component({
  selector: 'app-page-job-detail',
  templateUrl: './page-job-detail.component.html',
  styleUrls: ['./page-job-detail.component.css']
})
export class PageJobDetailComponent implements OnInit {
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
