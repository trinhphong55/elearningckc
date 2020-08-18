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
  DKLH:any[];
  success= false;
  error= false;
  checkexist= false;
  checkmssv= false;
  getday= Date.now();

  constructor(private lophocService: LophocService,private dangkikhoahocService: DangkikhoahocService ) {}

  ngOnInit(): void {
    this.getLopHoc();
    this.getDKLH();
  }
  ngAfterViewInit(): void {
    $(document).ready(function () {
      $('.ttth__select2').select2();
    });
  }
  getLopHoc(){
    this.lophocService.get().subscribe(data => {this.LopHoc = data;setTimeout(() => {}, 500);});
  }
  getDKLH(){
    this.dangkikhoahocService.getDKLH().subscribe(data => {this.DKLH = data;setTimeout(() => {}, 500);});
  }
  // add
  dangkikhoahoc(mssv: string,hoten: string,ngaysinh: string,noisinh: string,sodienthoai: string,lophoc: string,hinhthuchoc: string): void {
    if (!mssv || !hoten || !ngaysinh|| !noisinh|| !sodienthoai|| !lophoc|| !hinhthuchoc) {
      this.error=true;
      this.success=false;
      this.checkexist=false;
      this.checkmssv=false;
    }
    else{
      let kiemtra: any;
      let kiemtramssv : any ;
      this.DKLH.forEach(function (value) {
        if(value.mssv==mssv&&value.lophoc==lophoc){
          kiemtra=true;
        }
        if(isNaN(+mssv) || mssv.length !=10 || mssv.substr(0, 1) != '0'){
          kiemtramssv=false;
        }
      });
      if(kiemtramssv==false){
        this.checkmssv=true;
        this.checkexist=false;
        this.error=false;
        this.success=false;
      }
      else if(kiemtra==true){
        this.checkexist=true;
        this.error=false;
        this.success=false;
        this.checkmssv=false;
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
          this.getDKLH();
          this.getLopHoc();
        });
        this.success=true;
        this.checkexist=false;
        this.error=false;
        this.checkmssv=false;
      }
    }
  }
}
