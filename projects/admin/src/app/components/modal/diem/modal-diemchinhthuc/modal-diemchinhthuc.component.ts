import { LopHocService } from './../../../../services/lop-hoc.service';
import { nganhnghe } from './../../../../interfaces/NganhNghe.interface';
import { BacService } from './../../../../services/Bac.service';
import { FormControl, FormGroup, Validators, FormArray, FormControlName } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { NganhNgheService } from '../../../../services/NganhNghe.service';
import  {DiemSinhVienService } from '../../../../services/diem-sinh-vien.service';
import {SinhVienService } from '../../../../services/sinh-vien.service';
import {Diemsv} from '../../../../interfaces/diemsv.interface';
import { bac } from '../../../../interfaces/Bac.interface';
import { LHDTService } from '../../../../services/loaihinhdaotao.service';
import { LHDT } from '../../../../interfaces/loaihinhdaotao.interface';

declare var $: any

@Component({
  selector: 'app-modal-diemchinhthuc',
  templateUrl: './modal-diemchinhthuc.component.html',
  styleUrls: ['./modal-diemchinhthuc.component.css']
})
export class ModalDiemchinhthucComponent implements OnInit {

  hocKi = "1";
  dsLoaiHinhDaoTao: LHDT[];
  dsNganhNghe: nganhnghe[];
  dsNganhNghetmp: nganhnghe[];
  dsBac: bac[];
  dsLophoc: any;
  dsSinhvien: any;
  sinhvien: any;
  lophoc:any;
  diemsv : Diemsv = {
    maBac: "3",
    maNganhNghe: "006",
    khoaHoc: "20",
    maLoaiHinhDaoTao: "1",
    maLophoc: "39611711",
    maSinhVien: "0",
  };

  constructor(    private modalService: ModalService,
    private nganhngheservice: NganhNgheService,
    private bacservice: BacService,
    private lopHocService: LopHocService,
    private DiemSinhVienservice: DiemSinhVienService,
    private Sinhvienservice :SinhVienService,
    private lhdtservice : LHDTService) { }


  ngOnInit(): void {
    this.bacservice.getBac().subscribe(dsbac => this.dsBac = dsbac);
    this.lhdtservice.getLHDT().subscribe(dslhdt => this.dsLoaiHinhDaoTao = dslhdt);
    this.nganhngheservice.getNganhnghe().subscribe(dsnn => this.dsNganhNghe = dsnn);
    this.lopHocService.getAll().subscribe(lop=> this.dsLophoc=lop);
    this.Sinhvienservice.getAll().subscribe(sv=> this.dsSinhvien=sv);
    // console.log(this.dsSinhvien);
  }
  selectbac(e){
    this.dsNganhNghetmp=[];
    console.log(this.diemsv.maBac);
    this.dsNganhNghe.forEach(elm=>{
      if(elm.maBac==this.diemsv.maBac)
        this.dsNganhNghetmp.push(elm);
    });
    console.log(this.dsNganhNghetmp);
  }
  selectnganh(e){
    console.log(this.diemsv.maNganhNghe);
    this.lopHocService.getAllFormanghanh(this.diemsv.maNganhNghe).subscribe(lop=> this.dsLophoc=lop);
    console.log(this.dsLophoc);
  }
  selectlop(e){
    this.Sinhvienservice.laysinhvien(this.diemsv.maLophoc).subscribe(sv=>this.dsSinhvien=sv);

  }
  selectmasinhvien(e){
    this.Sinhvienservice.getonesv(this.diemsv.maSinhVien).subscribe(sv=>this.sinhvien=sv);
    this.diemsv.maLophoc=this.sinhvien.maLophoc;
    this.dsLophoc.forEach(element => {
      if(element.maLophoc==this.diemsv.maLophoc)
      {
        this.lophoc=element;
      }
    });

  }
  closeModal(id: string) {
    this.modalService.close(id)
  }


}
