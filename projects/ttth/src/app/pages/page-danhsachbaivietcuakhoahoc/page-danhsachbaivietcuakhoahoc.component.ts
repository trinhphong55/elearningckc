import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TintucService } from '../../services/tintuc.service';
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

  getTinTucTheoChuDe(id: string): void {
    this.tinTucService.getDanhSachTinTucTheoChuDe(id).subscribe((data) => {
      this.danhSachBaiVietTheoChuDe = data.data;
      console.log(this.danhSachBaiVietTheoChuDe);
    });
  }
}
