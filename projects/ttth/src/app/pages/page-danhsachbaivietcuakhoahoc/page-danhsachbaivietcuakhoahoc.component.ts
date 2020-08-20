import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TintucService } from '../../services/tintuc.service';
import * as moment from 'moment';

@Component({
  selector: 'app-page-danhsachbaivietcuakhoahoc',
  templateUrl: './page-danhsachbaivietcuakhoahoc.component.html',
  styleUrls: ['./page-danhsachbaivietcuakhoahoc.component.css'],
})
export class PageDanhsachbaivietcuakhoahocComponent implements OnInit {
  constructor(
    private tinTucService: TintucService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public danhSachBaiVietTheoChuDe: any = [];

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getTinTucTheoChuDe(id);
  }

  formatDatetime(time: string): string {
    if (time) {
      time = moment(time).format('HH:mm, DD-MM-YYYY');
      return time;
    }
    return '';
  }

  getTinTucTheoChuDe(id: string): void {
    this.tinTucService.getDanhSachTinTucTheoChuDe(id).subscribe((data) => {
      this.danhSachBaiVietTheoChuDe = data.data;
    });
  }
}
