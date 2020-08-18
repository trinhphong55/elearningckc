import { Component, OnInit } from '@angular/core';
import { TrangChuService } from '../../services/trangchu.service';
import { ThongTinChungService } from '../../services/thongtinchung.service';
import { HeaderFooterService } from '../../services/header-footer.service';

@Component({
  selector: 'app-page-trangchu',
  templateUrl: './page-trangchu.component.html',
  styleUrls: ['./page-trangchu.component.css'],
})
export class PageTrangchuComponent implements OnInit {
  constructor(
    private trangChuService: TrangChuService,
    private headerFooterService: HeaderFooterService,
    private thongTinChungService: ThongTinChungService
  ) {}

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
    {
      maViTri: 4,
      tenViTri: 'Mô tả cơ hội việc làm',
    },
  ];
  private _footer: any;
  private _thongTinChung: any;

  public listBaiVietQuanTrong: any = [];
  public listCoHoiViecLam: any = [];
  public listGioiThieuNgan: any = [];
  public listTinTucNoiBat: any = [];
  public listMoTaNganViecLam: any = [];
  public gioiThieuNganDauTien: any = {};
  public baiVietQuanTrongDauTien: any = {};
  public baiVietMoTaNganViecLam: any = {};

  public footer: any = {};
  public logoMenuMobile: any;
  public diaChi: any;
  public email: any;
  public copyRight: any;
  public soDienThoai: any;

  ngOnInit(): void {
    this.getDataCanHienThiLenTrangChu();
    this.getThongTinChung();
    this.getFooter();
  }

  logData(): void {}

  getDataCanHienThiLenTrangChu(): void {
    this.trangChuService.getDataCanHienThiLenTrangChu().subscribe((data) => {
      this._rawData = data;
      this.filterDataTheoTungViTri();
      this.baiVietQuanTrongDauTien = this.listBaiVietQuanTrong[0];
      this.gioiThieuNganDauTien = this.listGioiThieuNgan[0];
      this.baiVietMoTaNganViecLam = this.listMoTaNganViecLam[0];
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
    this.listMoTaNganViecLam = this._rawData.data.filter(
      (x) => x.viTriHienThi === 4
    );
  }

  getFooter(): void {
    this.headerFooterService.getFooter().subscribe((data) => {
      this._footer = data;
      if (this._footer.data.length > 0) {
        this.footer = this._footer.data[0];
      }
    });
  }

  getThongTinChung(): void {
    this.thongTinChungService.getThongTinChung().subscribe((res) => {
      this._thongTinChung = res;
      if (this._thongTinChung.data.length > 0) {
        this.logoMenuMobile =
          'https://localhost:4100/' +
          this._thongTinChung.data[0].logoMenuMobile;
        this.diaChi = this._thongTinChung.data[0].diaChi;
        this.email = this._thongTinChung.data[0].email;
        this.copyRight = this._thongTinChung.data[0].copyRight;
        this.soDienThoai = this._thongTinChung.data[0].soDienThoai;
      }
    });
  }
}
