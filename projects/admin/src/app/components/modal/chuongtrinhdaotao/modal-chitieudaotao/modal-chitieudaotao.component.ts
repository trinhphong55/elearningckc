import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-modal-chitieudaotao',
  templateUrl: './modal-chitieudaotao.component.html',
  styleUrls: ['./modal-chitieudaotao.component.css'],
})
export class ModalChitieudaotaoComponent implements OnInit {
  bacList = [
    { maBac: 'TC', tenBac: 'Trung cấp' },
    { maBac: 'CĐ', tenBac: 'Cao đẳng' },
    { maBac: 'CĐN', tenBac: 'Cao đẳng nghề ' },
  ];
  loaiHinhList = [
    { maLoai: 'CQ', tenLoai: 'Chính quy' },
    { maLoai: 'LT', tenLoai: 'Liên thông' },
  ];
  nganhList = [
    { maNganh: 'TH', tenNganh: 'Công nghệ thông tin' },
    { maNganh: 'SC,LR', tenNganh: 'Kỹ thuật sửa chữa, lắp ráp máy tính' },
    { maNganh: 'MMT', tenNganh: 'Mạng máy tính' },
  ];


  addForm: FormGroup;
  chiTieuList = new FormArray([]);
  data: {};
  lops = [];

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.addForm = new FormGroup({
      soLop: new FormControl('', [Validators.required]),
      bac: new FormControl('', [Validators.required]),
      loaiHinhDaoTao: new FormControl('', [Validators.required]),
      khoa: new FormControl('', [Validators.required]),
      nganh: new FormControl('', [Validators.required]),
    });

  }
  addChiTieu(){
    this.chiTieuList.push(new FormControl(''));
  }
  createClassModal() {
    // console.log(this.loaiHinhList);
    // console.log(this.bacList);
    // console.log(this.addForm.value);
    //console.log(this.chiTieuCtl.value);
    console.log(this.chiTieuList);
    console.log(this.chiTieuList.value);
    let len = 4;
    let convert = ['A', 'B', 'C', 'D','E', 'F', 'G', 'H'];

    for (let i = 0; i < len; i++) {
      this.lops.push(this.addForm.value.bac +" " + this.addForm.value.nganh + " " + this.addForm.value.khoa + convert[i]);
    }

  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
}
