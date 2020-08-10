import { Component, OnInit } from '@angular/core';
import { ThongTinChungService } from './services/thongtinchung.service';
import { HeaderFooterService } from './services/header-footer.service';
import { MenuHeader } from './models/menuheader';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private thongTinChungService: ThongTinChungService,
    private _HeaderFooterService: HeaderFooterService
  ) {}

  private _thongTinChung: any;
  private _header: any;

  public header: MenuHeader = {
    icon1: '',
    name1: '',
    url1: '',
    sub1: [],
    icon2: '',
    name2: '',
    url2: '',
    sub2: [],
    icon3: '',
    name3: '',
    url3: '',
    sub3: [],
    icon4: '',
    name4: '',
    url4: '',
    sub4: [],
    icon5: '',
    name5: '',
    url5: '',
    sub5: [],
  };
  public logo: any;
  public logoMenuMobile: any;
  public copyRight: any;
  public urlFacebook: any;
  public urlYoutube: any;

  ngOnInit(): void {
    this.getThongTinChung();
    this.getHeader();
  }

  logData(): void {
    // console.log(this.logo);
    // console.log(this.logoMenuMobile);
    // console.log(this.copyRight);
    // console.log(this.urlFacebook);
    // console.log(this.urlYoutube);
  }

  getHeader(): void {
    this._HeaderFooterService.getHeader().subscribe((data) => {
      this._header = data;
      if (this._header.data.length > 0) {
        this.header = this._header.data[0];
      }
    });
  }

  getThongTinChung(): void {
    this.thongTinChungService.getThongTinChung().subscribe((res) => {
      this._thongTinChung = res;
      if (this._thongTinChung.data.length > 0) {
        this.logo =
          'https://localhost:4100/' + this._thongTinChung.data[0].logo;
        this.logoMenuMobile =
          'https://localhost:4100/' +
          this._thongTinChung.data[0].logoMenuMobile;
        this.copyRight = this._thongTinChung.data[0].copyRight;
        this.urlFacebook = this._thongTinChung.data[0].urlFacebook;
        this.urlYoutube = this._thongTinChung.data[0].urlYoutube;
      }
    });
  }
}
