import { Component, OnInit } from '@angular/core';
import { TinTucCnttService } from '../../services/tintuc.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { TienIchSinhVienCnttService } from '../../services/TienIchSV.service';
@Component({
  selector: 'app-page-post',
  templateUrl: './page-post.component.html',
  styleUrls: ['./page-post.component.css'],
})
export class PagePostComponent implements OnInit {
  cnttTinTuc: any = [];
  cnttTinTucKhac: any = [];
  TienIch: any =[]
  constructor(
    private tinTucCnttService: TinTucCnttService,
    private actRoute: ActivatedRoute,
    private tienIchSinhVienCnttService : TienIchSinhVienCnttService,
    private router: Router
  ) {
    this.loadDanhSachTienIch();
  }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.loadTinTuc(id);
    this.loadTinTucKhac();
  }
  loadTinTuc(id) {
    this.tinTucCnttService.loadTinTuc(id).subscribe((data) => {
      this.cnttTinTuc = data.data;
    });
  }
  loadTinTucKhac() {
    this.tinTucCnttService.loadTinTucKhac().subscribe((data) => {
      this.cnttTinTucKhac = data.data;
    });
  }

  formatDatetime(time: string): string {
    time = moment(time).format('HH:mm, DD-MM-YYYY');
    return time;
  }
  loadDanhSachTienIch() {
    this.tienIchSinhVienCnttService.danhSachTienIch().subscribe((data) => {
      // console.log(data);
      this.TienIch = data.data;
    });
  }
  
}
