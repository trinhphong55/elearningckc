import { Component, OnInit } from '@angular/core';
import { LienheService } from '../../services/lienhe.service';
import { ttthLienHe } from '../../models/ttthLienHe';
import { ThongtinwebService } from '../../services/thongtinweb.service';
import { ttthThongTinWeb } from '../../models/ttthThongTinWeb';

@Component({
  selector: 'app-page-lienhe',
  templateUrl: './page-lienhe.component.html',
  styleUrls: ['./page-lienhe.component.css']
})
export class PageLienheComponent implements OnInit {
  LienHe: ttthLienHe[];
  ThongTinWeb: ttthThongTinWeb[];
  constructor(private LienheService: LienheService,private ThongtinwebService: ThongtinwebService  ) {}

  ngOnInit(): void {
    this.getThongTinWeb();
  }
  // add
  addLienHe(ten: string,email: string,noidung: string): void {
    if (!ten || !email || !noidung) {
      alert('Vui lòng nhập đủ thông tin')
    }
    else{
      const newItem: ttthLienHe = new ttthLienHe();
      newItem.ten = ten;
      newItem.email = email;
      newItem.noidung = noidung;
      newItem.ngaygui = new Date;
      newItem.trangthai = true;
      this.LienheService.add(newItem)
        .subscribe(data => {
          this.LienHe.push(data);
        });
      alert('Gửi thành công');
    }
  }
  getThongTinWeb(): void {
    this.ThongtinwebService.getThongTinWeb().subscribe(data => this.ThongTinWeb = data);
  }
}
