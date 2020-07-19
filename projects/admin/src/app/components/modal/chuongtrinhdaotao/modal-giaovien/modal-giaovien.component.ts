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
  maGVMoiNhat:string = '';
  constructor(private modalService: ModalService, private apiService:ApiService) {
  }

  ngOnInit(): void {
    this.apiService.layDanhSachGiaoVien().subscribe(
      data => this.danhSachGiaoVien = data,
    );
    this.apiService.layMaGVMoiNhat().subscribe(
      data => {
        let maGV = data.maGiaoVien;
        maGV = Number(maGV) > 10 ? '0' + Number(maGV) + 1 : '00' + (Number(maGV) + 1);
        this.maGVMoiNhat = 'GV' + maGV;
      }
    );
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  onSubmit(form: any): void{
    console.log('you submitted value: ', form);
    this.giaoVien = form;
    this.giaoVien.trinhDoChuyenMon = this.trinhDoChuyenMon;
    this.giaoVien.maGiaoVien = this.maGVMoiNhat;
    this.giaoVien.trangThai = 1;

    this.apiService.themGiaoVien(this.giaoVien).subscribe(
      (response) => console.log('response', response)
    );

    console.log(typeof this.selectedMaBoMon);
  }

  xoaGiaoVien(maGiaoVien:any){
    // this.apiService.xoaGiaoVien(maGiaoVien).subscribe(
    //   (response) => console.log('response', response)
    // )
  }

  onEdit(form:any): void{
    console.log('on edit');
  }
}
