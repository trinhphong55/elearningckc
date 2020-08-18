import { Component, OnInit,AfterViewInit } from '@angular/core';
import { DangkidotthiService } from '../../services/dangkidotthi.service';
import { ttthDangKiDotThi } from '../../models/ttthDangKiDotThi';
declare var $: any;
@Component({
  selector: 'app-page-dangkidotthi',
  templateUrl: './page-dangkidotthi.component.html',
  styleUrls: ['./page-dangkidotthi.component.css']
})
export class PageDangkidotthiComponent implements OnInit,AfterViewInit {
  DotThi: any[];
  DKDT: any[];
  success= false;
  error= false;
  checkexist= false;
  checkmssv= false;
  DangKiDotThi=[];
  getday= Date.now();
  constructor(private DangkidotthiService: DangkidotthiService ) {}

  ngOnInit(): void {
    this.getDotThi();
    this.getDKDT();
  }
  ngAfterViewInit(): void {
    $(document).ready(function () {
      $('.ttth__select2').select2();
    });
  }
  getDotThi(){
    this.DangkidotthiService.getDotThi().subscribe(data => {this.DotThi = data;setTimeout(() => {}, 500);});
  }
  getDKDT(){
    this.DangkidotthiService.getDKDT().subscribe(data => {this.DKDT = data;setTimeout(() => {}, 500);});
  }
  // add
  dangkidotthi(mssv: string,hoten: string,ngaysinh: string,noisinh: string,sodienthoai: string,tendot: string): void {
    if (!mssv || !hoten || !ngaysinh|| !noisinh|| !sodienthoai|| !tendot) {
      this.error=true;
      this.success=false;
      this.checkexist=false;
      this.checkmssv=false;
    }
    else{
      let kiemtra: any;
      let kiemtramssv : any ;
      this.DKDT.forEach(function (value) {
        if(value.mssv==mssv&&value.tendot==tendot){
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
      const newItem: ttthDangKiDotThi = new ttthDangKiDotThi();
      newItem.mssv = mssv;
      newItem.hoten = hoten;
      newItem.ngaysinh = ngaysinh;
      newItem.noisinh = noisinh;
      newItem.sodienthoai = sodienthoai;
      newItem.tendot = tendot;
      newItem.trangthai = true;
      newItem.created_at = (new Date);
      this.DangkidotthiService.add(newItem)
        .subscribe((data) => {
          this.DangKiDotThi.push(data);
          this.getDKDT();
        });
        this.success=true;
        this.checkexist=false;
        this.error=false;
        this.checkmssv=false;
      }
    }
  }

}
