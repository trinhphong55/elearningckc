import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { ApiService } from '../../../../services/api.service';
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

  constructor(private modalService: ModalService, private apiService:ApiService) {
  }

  layDanhSachGiaoVien():void {
    this.apiService.layDanhSachGiaoVien().subscribe(
      data => this.danhSachGiaoVien = data,
    );
  }

  layMaGVMoiNhat():void {
    this.apiService.layMaGVMoiNhat().subscribe(
      data => {
        let maGV = data.maGiaoVien;
        this.maGV = this.formatMaGV(maGV);
      }
    );
  }

  ngOnInit(): void {
    this.layDanhSachGiaoVien();
    this.layMaGVMoiNhat();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  onSubmit(form: any): void{
    console.log('you submitted value: ', form);
    this.giaoVien = form;
    this.giaoVien.trinhDoChuyenMon = this.trinhDoChuyenMon;
    this.giaoVien.maGiaoVien = this.maGV;
    this.giaoVien.matKhauBanDau = '123456';
    this.giaoVien.trangThai = 1;

    this.apiService.themGiaoVien(this.giaoVien).subscribe(
      (response) => console.log('response', response)
    );

    this.setDefaultValue();

    this.layDanhSachGiaoVien();

    this.layMaGVMoiNhat();
  }

  xoaGiaoVien(maGiaoVien:any){
    this.apiService.xoaGiaoVien({maGiaoVien: maGiaoVien}).subscribe(
      (response) => console.log('response', response)
    )

    this.layDanhSachGiaoVien();
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
      }
    )
  }
  ResetForm():void{
    this.layMaGVMoiNhat();
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
        (response) => alert(response.msg)
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
