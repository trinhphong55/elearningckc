import { Component, OnInit,AfterViewInit } from '@angular/core';
import { LophocService } from '../../services/lophoc.service';
import { DangkikhoahocService } from '../../services/dangkikhoahoc.service';
import { ttthDangKiKhoaHoc } from '../../models/ttthDangKiKhoaHoc';
// import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-page-dangkikhoahoc',
  templateUrl: './page-dangkikhoahoc.component.html',
  styleUrls: ['./page-dangkikhoahoc.component.css']
})
export class PageDangkikhoahocComponent implements OnInit,AfterViewInit {
  LopHoc: any[];
  DangKiKhoaHoc: ttthDangKiKhoaHoc[];
  constructor(private lophocService: LophocService,private dangkikhoahocService: DangkikhoahocService ) {}

  ngOnInit(): void {
    this.getLopHoc();
  }
  ngAfterViewInit(): void {
    $(document).ready(function () {
      $('.ttth__select2').select2();
    });
  }
  getLopHoc(){
    this.lophocService.get().subscribe(data => this.LopHoc = data);
  }
  // add
  dangkikhoahoc(mssv: string,hoten: string,ngaysinh: string,noisinh: string,sodienthoai: string,lophoc: string,hinhthuchoc: string): void {
    if (!mssv || !hoten || !ngaysinh|| !noisinh|| !sodienthoai|| !lophoc|| !hinhthuchoc) {
      alert('Vui lòng nhập đủ thông tin')
    }
    else{
      const newItem: ttthDangKiKhoaHoc = new ttthDangKiKhoaHoc();
      newItem.mssv = mssv;
      newItem.hoten = hoten;
      newItem.ngaysinh = ngaysinh;
      newItem.noisinh = noisinh;
      newItem.sodienthoai = sodienthoai;
      newItem.lophoc = lophoc;
      newItem.hinhthuchoc = hinhthuchoc;
      newItem.trangthai = true;
      newItem.created_at = (new Date);
      this.dangkikhoahocService.add(newItem)
        .subscribe(data => {
          this.LopHoc.push(data);
        });
      alert('Gửi thành công');
    }

  }
}
