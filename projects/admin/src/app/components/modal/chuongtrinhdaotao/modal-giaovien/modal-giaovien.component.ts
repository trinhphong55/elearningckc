import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { ApiService } from '../../../../services/api.service';
import { BomonService } from '../../../../services/khoa-bomons/bomon.service';
import { GvlhpService } from '../../../../services/gvlhp.service';
import { LopHocPhanService } from '../../../../services/lophocphan.service';

import { GiaoVien } from '../../../../../models/giaoVien';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-modal-giaovien',
  templateUrl: './modal-giaovien.component.html',
  styleUrls: ['./modal-giaovien.component.css']
})
export class ModalGiaovienComponent implements OnInit {
  public giaoVien:GiaoVien;
  public danhSachGiaoVien:GiaoVien[];
  textSearch;
  trangThai: number = 1;
  trinhDoChuyenMon: string = 'Thạc sĩ';
  selectedMaBoMon: string = '';
  file:File;
  dsGiaoVienExcel: any;

  maGV:string = '';
  ho:string = '';
  ten:string = '';
  ngaySinh:string ='';
  cmnd:string = '';
  diaChiThuongTru:string = '';
  sdt:string = '';
  email:string = '';

  setDefaultValue(){
    this.ho = '';
    this.ten = '';
    this.ngaySinh = '';
    this.cmnd = '';
    this.diaChiThuongTru = '';
    this.email = '';
    this.sdt = '';
  }

  dsBoMon: any;
  dsgvLHP: any;
  constructor(private modalService: ModalService,
    private apiService:ApiService,
    private boMonService:BomonService,
    private gvLHPService: GvlhpService,
    private lopHocPhanService: LopHocPhanService) {
    this.boMonService.getAll().subscribe(
      data => {
        this.dsBoMon = data
      }
    );
  }

  ngOnInit(): void {
    this.layDanhSachGiaoVien();
    // this.layMaGVMoiNhat();
  }


  layDanhSachGiaoVien():void {
    this.trangThai = 1;
    this.apiService.layDanhSachGiaoVien().subscribe(
      data => {
        this.danhSachGiaoVien = data;
        this.danhSachGiaoVien.map(gv => {
          gv.danhSachLopHocPhan = [];
          this.gvLHPService.timGiaoVienLHPTheoMaGV(gv.maGiaoVien).subscribe(
            (res) => {
              const danhSachLHP = res;
              danhSachLHP.map(lhp => {
                this.lopHocPhanService.getLopHocPhanbyMaLopHocPhan(lhp.maLopHocPhan).subscribe(
                  (response) => {
                    gv.danhSachLopHocPhan.push(response[0].tenLopHocPhan);
                  }
                )
              })
            }
          )
        })
      }
    );
  }

  restoreGiaoVien(maGiaoVien: string) {
    this.customConfirm("Bạn muốn phục hồi giáo viên này?", () => {
      this.apiService.setTrangThai(maGiaoVien).subscribe(
        (response) => {
          alert(response.msg);
          if(response.status == true){
            this.setDefaultValue();
            this.layDanhSachGiaoVienTheoTrangThai();
          }
        }
      )
    })
  }

  layDanhSachGiaoVienTheoTrangThai():void {
    this.apiService.layDanhSachGiaoVienTheoTrangThai(this.trangThai).subscribe(
      data => {
        this.danhSachGiaoVien = data;
        this.danhSachGiaoVien.map(gv => {
          gv.danhSachLopHocPhan = [];
          this.gvLHPService.timGiaoVienLHPTheoMaGV(gv.maGiaoVien).subscribe(
            (res) => {
              const danhSachLHP = res;
              danhSachLHP.map(lhp => {
                this.lopHocPhanService.getLopHocPhanbyMaLopHocPhan(lhp.maLopHocPhan).subscribe(
                  (response) => {
                    gv.danhSachLopHocPhan.push(response[0].tenLopHocPhan);
                  }
                )
              })
            }
          )
        })
      }
    );
  }

  changeTrangThai() {
    this.layDanhSachGiaoVienTheoTrangThai();
    this.setDefaultValue();
  }

  // layMaGVMoiNhat():void {
  //   this.apiService.layMaGVMoiNhat().subscribe(
  //     data => {
  //       if(data == null){
  //         this.maGV = '0001';
  //       }
  //       else{
  //         let maGV = data.maGiaoVien;
  //         this.maGV = this.formatMaGV(maGV);
  //       }
  //     }
  //   );
  // }

  changeBoMon(maGV: string, maBoMon: string) {
    this.apiService.capNhatBoMon(maGV, maBoMon).subscribe(
      (response) => {
        alert(response.msg);
        if(response.status == true){
          this.setDefaultValue();
          this.layDanhSachGiaoVien();
          // this.layMaGVMoiNhat();
        }
      }
    )
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  onSubmit(form: any): void{
    // console.log('you submitted value: ', form);
    if (form.ho.trim() === "" || form.ten.trim() === "" ||
    form.email.trim() === "" || form.ngaySinh.trim() === "" ||
    form.cmnd.trim() === "" || form.sdt.trim() === "") {
      alert('Vui lòng nhập đầy dủ thông tin');
      return;
    }
    this.giaoVien = form;
    this.giaoVien.trinhDoChuyenMon = this.trinhDoChuyenMon;
    this.giaoVien.maGiaoVien = this.maGV;
    this.giaoVien.password = '123456';
    this.giaoVien.trangThai = 1;

    this.apiService.themGiaoVien(this.giaoVien).subscribe(
      (response) => {
        alert(response.msg);
        if(response.status == true){
          this.setDefaultValue();
          this.layDanhSachGiaoVien();
        }
      }
    );
  }

  customConfirm(message: string, oke: Function) {
    let a = confirm(message);
    if (a) {
      oke();
    } else {
      return;
    }
  }

  Update(form: any): void{
    // console.log('you submitted value: ', form);
    if (form.ho.trim() === "" || form.ten.trim() === "" ||
    form.email.trim() === "" || form.ngaySinh.trim() === "" ||
    form.cmnd.trim() === "" || form.sdt.trim() === "") {
      alert('Vui lòng nhập đầy dủ thông tin');
      return;
    }
    this.giaoVien = form;
    this.giaoVien.trinhDoChuyenMon = this.trinhDoChuyenMon;
    this.giaoVien.maGiaoVien = this.maGV;

    this.apiService.capNhatGiaoVien(this.giaoVien).subscribe(
      (response) => {
        alert(response.msg);
        if(response.status == true){
          this.setDefaultValue();
          this.layDanhSachGiaoVien();
          // this.layMaGVMoiNhat();
        }
      }
    )
  }

  xoaGiaoVien(maGiaoVien:any){
    this.customConfirm("Bạn có chắc muốn xóa giáo viên này?", () => {
      this.apiService.xoaGiaoVien({maGiaoVien: maGiaoVien}).subscribe(
        (response) => {
          alert(response.msg);
          if(response.status == true){
            this.layDanhSachGiaoVien();
          }
        }
      )
    })
  }

  layThongTinGiaoVien(maGiaoVien:any){
    this.apiService.layThongTinGiaoVien({maGiaoVien: maGiaoVien}).subscribe(
      (response) => {
        this.maGV = response[0].maGiaoVien;
        this.ho = response[0].ho;
        this.ten = response[0].ten;
        this.ngaySinh = response[0].ngaySinh;
        this.cmnd = response[0].cmnd;
        this.diaChiThuongTru = response[0].diaChiThuongTru;
        this.email = response[0].email;
        this.sdt = response[0].sdt;
        this.selectedMaBoMon = response[0].maBoMon;
        this.trinhDoChuyenMon = response[0].trinhDoChuyenMon;
      }
    )
  }
  ResetForm():void{
    // this.layMaGVMoiNhat();
  }

  uploadFileExcel(event){
    this.file = event.target.files[0];
  }

  readFileExcel(){
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.dsGiaoVienExcel = fileReader.result;
      var data = new Uint8Array(this.dsGiaoVienExcel);
      var arr = new Array();
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {type:"binary"});
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.dsGiaoVienExcel = XLSX.utils.sheet_to_json(worksheet,{raw:true});
      this.apiService.themDSGiaoVienExcel(this.dsGiaoVienExcel).subscribe(
        (response) => {
          alert(response.msg);
          this.layDanhSachGiaoVien();
          // this.layMaGVMoiNhat();
        }
      )
    }
    fileReader.readAsArrayBuffer(this.file);
  }

  formatMaGV(maGV: string): string{
    let temp: number = Number(maGV) + 1;
    let i = 4 - temp.toString().length;
    let result: string = '';
    while(i > 0){
      result += '0';
      i--;
    }
    result += temp.toString();
    return result;
  }
}
