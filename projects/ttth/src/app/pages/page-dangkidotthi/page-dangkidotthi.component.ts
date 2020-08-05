import { Component, OnInit } from '@angular/core';
import { DangkidotthiService } from '../../services/dangkidotthi.service';
import { ttthDangKiDotThi } from '../../models/ttthDangKiDotThi';
@Component({
  selector: 'app-page-dangkidotthi',
  templateUrl: './page-dangkidotthi.component.html',
  styleUrls: ['./page-dangkidotthi.component.css']
})
export class PageDangkidotthiComponent implements OnInit {
  DotThi: any[];
  DangKiDotThi: ttthDangKiDotThi[];
  constructor(private DangkidotthiService: DangkidotthiService ) {}

  ngOnInit(): void {
    this.getDotThi();
  }
  getDotThi(){
    this.DangkidotthiService.getDotThi().subscribe(data => this.DotThi = data);
  }
  // add
  dangkidotthi(mssv: string,hoten: string,ngaysinh: string,noisinh: string,sodienthoai: string,lophoc: string): void {
    if (!mssv || !hoten || !ngaysinh|| !noisinh|| !sodienthoai|| !lophoc) {
      alert('Vui lòng nhập đủ thông tin')
    }
    else{
      const newItem: ttthDangKiDotThi = new ttthDangKiDotThi();
      newItem.mssv = mssv;
      newItem.hoten = hoten;
      newItem.ngaysinh = ngaysinh;
      newItem.noisinh = noisinh;
      newItem.sodienthoai = sodienthoai;
      newItem.lophoc = lophoc;
      newItem.trangthai = true;
      newItem.created_at = (new Date);
      this.DangkidotthiService.add(newItem)
        .subscribe(data => {
          this.DangKiDotThi.push(data);
        });
      alert('Gửi thành công');
    }

  }

}
