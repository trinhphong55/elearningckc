import { Component, OnInit } from '@angular/core';
import { ttthThongTinWeb } from '../../models/ttthThongTinWeb';
import { ThongtinwebService } from '../../services/thongtinweb.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private thongtinwebService: ThongtinwebService) {}

  public ThongTinWeb: ttthThongTinWeb[];
  public danhSachChuDe: any = [];

  ngOnInit(): void {
    this.getBannerfromServices();
    this.getDanhSachChuDe();
  }

  getBannerfromServices(): void {
    this.thongtinwebService
      .getThongTinWeb()
      .subscribe((data) => (this.ThongTinWeb = data));
  }

  getDanhSachChuDe(): void {
    this.thongtinwebService.getDanhSachChuDe().subscribe((data) => {
      this.danhSachChuDe = data.data;
    });
  }
}
