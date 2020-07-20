import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { ApiService } from '../../../../services/api.service';
import { GiaoVien } from '../../../../../models/giaoVien';
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

  maGV:string = '';
  ho:string = '';
  ten:string = '';
  ngaySinh:string ='';
  cmnd:string = '';
  diaChiThuongTru:string = '';
  sdt:string = '';
  email:string = '';

  maGVMoiNhat:string = '';
  public giaoVienSelected: GiaoVien;
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
        this.maGVMoiNhat = this.formatMaGV(maGV);
        this.maGV = this.maGVMoiNhat;
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
        // this.giaoVienSelected = response[0];
        this.ho = response[0].ho;
        this.ten = response[0].ten;
        this.ngaySinh = response[0].ngaySinh;
        this.cmnd = response[0].cmnd;
        this.diaChiThuongTru = response[0].diaChiThuongTru;
        this.giaoVien = response[0].giaoVien;
        this.email = response[0].email;
        this.sdt = response[0].sdt;
      }
    )
  }
  ResetForm():void{
    console.log('reset form');
    this.maGV = this.maGVMoiNhat;
    console.log(this.maGV);
  }

  onEdit(form:any): void{
    console.log('on edit');
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
