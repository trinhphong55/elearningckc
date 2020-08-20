import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {TintucService} from '../../services/tintuc.service';
import * as moment from 'moment';

@Component({
  selector: 'app-page-chitiettintuc',
  templateUrl: './page-chitiettintuc.component.html',
  styleUrls: ['./page-chitiettintuc.component.css']
})
export class PageChitiettintucComponent implements OnInit {
  TinTuc : any = [];
  TinTucKhac : any = [];
  constructor(private tintucService: TintucService,private actRoute: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getChiTietTinTuc(id);
    this.getChiTietTinKhac();
  }
  getChiTietTinTuc(id){
    this.tintucService.getChiTietTinTuc(id).subscribe(data => {
      this.TinTuc = data.data;
    });
  }
  getChiTietTinKhac(){
    this.tintucService.getChiTietTinKhac().subscribe(data => {
      this.TinTucKhac = data.data;
    });
  }

  formatDatetime(time: string): string {
    if (time) {
      time = moment(time).format('HH:mm, DD-MM-YYYY');
      return time;
    }
    return '';
  }
}
