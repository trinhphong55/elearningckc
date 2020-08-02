import { Component, OnInit } from '@angular/core';
import { ThongTinChungService } from './services/thongtinchung.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private thongTinChungService: ThongTinChungService) {}

  private _thongTinChung: any;

  public logo: any;
  public logoMenuMobile: any;
  public diaChi: any;
  public email: any;
  public copyRight: any;
  public soDienThoai: any;
  public urlFacebook: any;
  public urlYoutube: any;

  ngOnInit(): void {
    this.getThongTinChung();
  }

  logData(): void {
    console.log(this.logo);
    console.log(this.logoMenuMobile);
    console.log(this.diaChi);
    console.log(this.email);
    console.log(this.copyRight);
    console.log(this.soDienThoai);
    console.log(this.urlFacebook);
    console.log(this.urlYoutube);
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
        this.diaChi = this._thongTinChung.data[0].diaChi;
        this.email = this._thongTinChung.data[0].email;
        this.copyRight = this._thongTinChung.data[0].copyRight;
        this.soDienThoai = this._thongTinChung.data[0].soDienThoai;
        this.urlFacebook = this._thongTinChung.data[0].urlFacebook;
        this.urlYoutube = this._thongTinChung.data[0].urlYoutube;
      }
    });
  }
}
