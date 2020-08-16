import { Component, OnInit, COMPILER_OPTIONS } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import{BaiTapService} from"../../services/bai-tap.service";
import{chiTietDiemSVLopHocPhanService} from"../../../../../admin/src/app/services/chiTietDiemSVLHP.service"
import { from } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-page-chamdiem',
  templateUrl: './page-chamdiem.component.html',
  styleUrls: ['./page-chamdiem.component.css']
})
export class PageChamdiemComponent implements OnInit {
dsBaiTap:any;
dsSv:any;
dsDiem:any;
chamDiemSV:any;
getDiem:any;
thongTinExcel:any
formChamDiem = new FormGroup({
  chamDiemSV: new FormControl(),
})
  constructor(private baiTapService:BaiTapService,private router: ActivatedRoute, private route: Router,
    private ChiTietDiemSVLopHocPhanService:chiTietDiemSVLopHocPhanService) { }

  ngOnInit(): void {
    this.hienThiDanhSach();
  }
  hienThiDanhSach(){
    this.baiTapService.danhSachBtChamDiem(this.router.snapshot.paramMap.get('id')).subscribe(
      dsBaiTap=>{
        this.dsBaiTap=dsBaiTap;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  danhSachChamDiem(detail){
    this.ChiTietDiemSVLopHocPhanService.layDanhSachSvChamDiemTheoMaCotDiem(detail.maCotDiem).subscribe(
      dsSv=>{
        this.dsSv=dsSv;
      },
      (error)=>{
        console.log(error);
      }
    )
    this.formChamDiem = new FormGroup({
      chamDiemSV: new FormControl(detail.diem),
    })
  }
  
  chamDiemSinhVien(sv){
    if( ( (this.formChamDiem.get("chamDiemSV").value)>=0 && (this.formChamDiem.get("chamDiemSV").value)<=10) &&((this.formChamDiem.get("chamDiemSV").value)!=null))
    {
     this.getDiem={diem:(this.formChamDiem.get("chamDiemSV").value)};
       this.ChiTietDiemSVLopHocPhanService.chamDiem(sv._id, this.getDiem).subscribe(
        dsDiem=>{
          this.dsDiem=dsDiem;
        },
        (error)=>{
          console.log(error);
        }
      )
    }
    else
    {
      alert("Nhập Dữ Liệu Sai Vui Lòng Kiểm Tra Lại!")
    }
  }
  exPortExcel(detail)
  {
    this.ChiTietDiemSVLopHocPhanService.xuatThongTinExcel(detail.maCotDiem).subscribe(
      thongTinExcel=>{
        this.thongTinExcel=thongTinExcel;
         this.ChiTietDiemSVLopHocPhanService.exportAsExcelFile(this.thongTinExcel,"DiemSinhvien")
      },
      (error)=>{
        console.log(error);
      }
    )
  }
   
  }



