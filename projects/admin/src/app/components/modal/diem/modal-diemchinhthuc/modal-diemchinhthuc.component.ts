
import { FormControl, FormGroup, Validators, FormArray, FormControlName } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { BacService } from '../../../../services/Bac.service';
import { LopHocService } from '../../../../services/lop-hoc.service';
import { SinhVienService } from '../../../../services//sinh-vien.service';

declare var $: any

@Component({
  selector: 'app-modal-diemchinhthuc',
  templateUrl: './modal-diemchinhthuc.component.html',
  styleUrls: ['./modal-diemchinhthuc.component.css']
})
export class ModalDiemchinhthucComponent implements OnInit {
  maLopHoc: string = null;
  bac: any;
  lop: any;
  sinhvien: any;
  maBac: number = null;

  formDiemChinhThuc = new FormGroup({
    maLopHoc: new FormControl(),
    maBac: new FormControl(),
  })


  constructor(private modalService: ModalService,
    private bacService: BacService,
    private lopHocService: LopHocService,
    private sinhVienService: SinhVienService) { }

  ngOnInit(): void {
    this.danhSachBac();
    this.danhSachLop();
    this.dsSinhvien();
  }

  //danh sach bac
  danhSachBac() {
    this.bacService.getBac().subscribe(
      (bac) => {
        this.bac = bac;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //danhSachLop
  danhSachLop() {
    this.lopHocService.getMaBac(this.formDiemChinhThuc.get('maBac').value).subscribe(
      (lop) => {
        this.lop = lop;
        console.log(this.lop);
        console.log(this.formDiemChinhThuc.get('maBac').value);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //danh sach sv
  dsSinhvien() {
    this.sinhVienService.getAll().subscribe(
      (sinhvien) => {
        this.sinhvien = sinhvien;
        console.log(this.sinhvien)
      },
      (error) => {
        console.log(console.error);
      }
    );
  }


  logData() {

    // this.sinhVienService.laysinhvien(this.formDiemChinhThuc.get('maLopHoc').value).subscribe(
    //   (sinhvien) => {
    //     this.sinhvien = sinhvien;
    //     console.log(this.sinhvien)
    //   },
    //   (error) => {
    //     console.log(console.error);
    //   }
    // );
    // console.log(this.maBac),
    // console.log(this.formDiemChinhThuc.get('maBac').value)
    this.lopHocService.getMaBac(this.formDiemChinhThuc.get('maBac').value).subscribe(
      (lop) => {
        this.lop = lop;
        console.log(this.lop);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }


}
