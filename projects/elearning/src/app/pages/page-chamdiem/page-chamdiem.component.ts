import { Component, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import{BaiTapService} from"../../services/bai-tap.service";
import{chiTietDiemSVLopHocPhanService} from"../../../../../admin/src/app/services/chiTietDiemSVLHP.service"
import { from } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import{ChiTietDiemSVLHP} from"../../models/ChiTietDiemSVLHP.interface";
import * as XLSX from 'xlsx';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
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
thongTinExcel:any;
importEx:any;
getMaExcel:any;

dsDiemSV:ChiTietDiemSVLHP[];
formChamDiem = new FormGroup({
  chamDiemSV: new FormControl(),
})
  constructor(private baiTapService:BaiTapService,private router: ActivatedRoute, private route: Router,
    private ChiTietDiemSVLopHocPhanService:chiTietDiemSVLopHocPhanService,private toastrService:ToastrService) { }

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
    this.getMaExcel= detail.maCotDiem;
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
  exPortExcel()
  {
    this.ChiTietDiemSVLopHocPhanService.xuatThongTinExcel(this.getMaExcel).subscribe(
      thongTinExcel=>{
        this.thongTinExcel=thongTinExcel;
         this.ChiTietDiemSVLopHocPhanService.exportAsExcelFile(this.thongTinExcel,"DiemSinhvien")
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  ///excel

  spinnerEnabled = false;
  keys: string[];
  dataSheet = new Subject;
  @ViewChild('inputFile') inputFile: ElementRef;
  isExcelFile: boolean;

  onChange(evt) {
    let data;
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/);
    if (target.files.length > 1) {
      this.inputFile.nativeElement.value = '';
    }
    if (this.isExcelFile) {
      this.spinnerEnabled = true;
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        data = XLSX.utils.sheet_to_json(ws);
        this.dsDiemSV = data;
      };

      reader.readAsBinaryString(target.files[0]);

      reader.onloadend = (e) => {
        this.spinnerEnabled = false;
        this.keys = Object.keys(data[0]);
        // console.log(this.dsMonHoc);
        this.dataSheet.next(data);
      }
    } else {
      this.inputFile.nativeElement.value = '';
    }
  }


  removeData() {
    this.inputFile.nativeElement.value = '';
    this.dataSheet.next(null);
    this.keys = null;
    this.dsDiemSV = undefined;
  }
  importExcel() {
    this.ChiTietDiemSVLopHocPhanService.NhapThongTinExcel(this.getMaExcel,this.dsDiemSV).subscribe(
      importEx=>{
        if(importEx!=null)
        {
         this.importEx=importEx;
         location.reload();
         this.toastrService.success("import thành công", 'Thông Báo!', { timeOut: 6000 });
        
       }
         else
         {
          this.toastrService.error("import thất bại", 'Thông Báo!', { timeOut: 6000 });
         }
      },
     error=>{
       console.log(error)
       this.toastrService.error("import thất bại", 'Thông Báo!', { timeOut: 6000 });
     })
  }
}

   



