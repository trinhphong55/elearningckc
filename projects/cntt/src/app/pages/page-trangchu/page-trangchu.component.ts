import { Component, OnInit } from '@angular/core';
import { Swiper } from 'swiper';
import { TrangChuService } from '../../services/trangchu.service';
declare var $: any;

@Component({
  selector: 'app-page-trangchu',
  templateUrl: './page-trangchu.component.html',
  styleUrls: ['./page-trangchu.component.css'],
})
export class PageTrangchuComponent implements OnInit {
  constructor(private trangChuService: TrangChuService) {}

  private _rawData: any = [];
  private _viTriHienThi: any = [
    {
      maViTri: 0,
      tenViTri: 'Bài viết quan trọng',
    },
    {
      maViTri: 1,
      tenViTri: 'Cơ hội việc làm',
    },
    {
      maViTri: 2,
      tenViTri: 'Giới thiệu ngắn',
    },
    {
      maViTri: 3,
      tenViTri: 'Tin tức nổi bật',
    },
  ];

  listBaiVietQuanTrong: any = [];
  listCoHoiViecLam: any = [];
  listGioiThieuNgan: any = [];
  listTinTucNoiBat: any = [];

  baiBietQuanTrongDauTien: any;

  ngOnInit(): void {
    this.getDataCanHienThiLenTrangChu();
  }

  logData(): void {
    console.log(this._rawData);
    console.log('filter data theo tung vi tri');
    console.log('log listBaiVietQuanTrong');
    console.log(this.listBaiVietQuanTrong);
    console.log('log listCoHoiViecLam');
    console.log(this.listCoHoiViecLam);
    console.log('log listGioiThieuNgan');
    console.log(this.listGioiThieuNgan);
    console.log('log listTinTucNoiBat');
    console.log(this.listTinTucNoiBat);
  }

  getDataCanHienThiLenTrangChu(): void {
    this.trangChuService.getDataCanHienThiLenTrangChu().subscribe((data) => {
      this._rawData = data;
      this.filterDataTheoTungViTri();
      this.baiBietQuanTrongDauTien = this.listBaiVietQuanTrong[0];
    });
  }

  filterDataTheoTungViTri(): void {
    this.listBaiVietQuanTrong = this._rawData.data.filter(
      (x) => x.viTriHienThi === 0
    );
    this.listCoHoiViecLam = this._rawData.data.filter(
      (x) => x.viTriHienThi === 1
    );
    this.listGioiThieuNgan = this._rawData.data.filter(
      (x) => x.viTriHienThi === 2
    );
    this.listTinTucNoiBat = this._rawData.data.filter(
      (x) => x.viTriHienThi === 3
    );
  }
}
