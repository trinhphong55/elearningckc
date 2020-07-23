import { nganhnghe } from './../../../../interfaces/NganhNghe.interface';
import { BacService } from './../../../../services/Bac.service';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { NganhNgheService } from '../../../../services/NganhNghe.service';

@Component({
  selector: 'app-modal-chitieudaotao',
  templateUrl: './modal-chitieudaotao.component.html',
  styleUrls: ['./modal-chitieudaotao.component.css'],
})
export class ModalChitieudaotaoComponent implements OnInit {
  bacList:any;
  loaiHinhList = [
    { maLoai: 'CQ', tenLoai: 'Chính quy' },
    { maLoai: 'LT', tenLoai: 'Liên thông' },
  ];
  nganhList:any;
  addForm: FormGroup;
  chiTieuList = new FormArray([]);
  lops = [];

  constructor(
    private modalService: ModalService,
    private nganhngheservice: NganhNgheService,
    private bacservice: BacService
  ) {}

  ngOnInit(): void {
    this.addForm = new FormGroup({
      soLop: new FormControl('', [Validators.required]),
      bac: new FormControl('', [Validators.required]),
      loaiHinhDaoTao: new FormControl('', [Validators.required]),
      khoa: new FormControl('', [Validators.required]),
      nganh: new FormControl('', [Validators.required]),
    });
    this.getNganhNghe();
    this.getbac();
  }

  getbac() {
    this.bacservice.getBac().subscribe(
      (bac) => {
        this.bacList = bac;
        console.log(this.bacList);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getNganhNghe() {
    this.nganhngheservice.getNgangnghe().subscribe(
      (data) => {
        this.nganhList = data;
        this.nganhList.forEach(element => {
          this.chiTieuList.push(new FormControl(''));
        });
        console.log(this.nganhList);
      },
      (error) => {
        console.log(error);
      }
    );

  }


  addChiTieu() {
    this.chiTieuList.push(new FormControl(''));
  }

  createClassModal(nganhnghe) {
    // console.log(this.loaiHinhList);
    // console.log(this.bacList);
    // console.log(this.addForm.value);
    //console.log(this.chiTieuCtl.value);
    // console.log(this.chiTieuList);
    // console.log(this.chiTieuList.value);
    console.log(nganhnghe);
    let len = 4;
    let convert = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    for (let i = 0; i < len; i++) {
      this.lops.push(
        this.addForm.value.bac +
          ' ' +
          this.addForm.value.nganh +
          ' ' +
          this.addForm.value.khoa +
          convert[i]
      );
    }
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
}
