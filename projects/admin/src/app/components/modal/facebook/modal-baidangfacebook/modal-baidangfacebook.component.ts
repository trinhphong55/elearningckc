import { from } from 'rxjs';
import { LopHocService } from './../../../../services/lop-hoc.service';
import { TrangThaifbService } from './../../../../services/trangthaifb.service';
import { BaiDangfbService } from './../../../../services/baidangfb.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
@Component({
  selector: 'app-modal-baidangfacebook',
  templateUrl: './modal-baidangfacebook.component.html',
  styleUrls: ['./modal-baidangfacebook.component.css'],
})
export class ModalBaidangfacebookComponent implements OnInit {
  data: any;
  trangthai: any;
  setTrangthai: any;
  mess:any;
  selectedCityIds: string[];
  //Khai báo list
  public posttams: any;
  public addForm: FormGroup;
  cities2 = [
    {id: 1, name: 'Vilnius'},
    {id: 2, name: 'Kaunas'},
    {id: 3, name: 'Pavilnys', disabled: true},
    {id: 4, name: 'Pabradė'},
    {id: 5, name: 'Klaipėda'}
];
  constructor(
    private modalService: ModalService,
    private baiDangService: BaiDangfbService,
    private trangthaifbSV: TrangThaifbService,
    private lophocSV: LopHocService
  ) {}
  searchpage;
  lopHoc:any;
  ngOnInit(): void {
    this.addForm = new FormGroup({
      trangThai: new FormControl(''),
      theLoai: new FormControl(),
    });
    this.getAll();
    this.getTrangthai();
    this.changedTrangThai();
    this.fixLayout();
     this.getLopHoc();

  }

  getAll() {
    this.baiDangService.getAll().subscribe((data) => {
      this.data = data;
      this.posttams = data;
    });
  }

  getLopHoc(){
    this.lophocSV.getAll().subscribe((lopHoc)=>{
      this.lopHoc = lopHoc;
    })
  }

  getTrangthai(){
    this.trangthaifbSV.getAll().subscribe((trangthai) => {
      this.trangthai = trangthai;
    });
  }

  changeTrangthai(d){
    this.baiDangService.delete(d._id).subscribe((ress:any)=>{
      this.mess = ress.msg;
      alert(this.mess);
      console.log(ress);
      this.getAll();
    })
  }

  //bắt sự kiện show post theo trạng thái
  changedTrangThai() {
    this.posttams = [];
    if (this.addForm.value.trangThai !== '') {
      this.data.forEach((element) => {
        if (element.trangThai == this.addForm.value.trangThai) {
          this.posttams.push(element);
        }
      });
    } else {
      this.posttams = this.data;
    }
  }

  fixLayout(){

  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
