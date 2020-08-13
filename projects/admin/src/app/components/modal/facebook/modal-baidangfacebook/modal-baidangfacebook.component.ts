import { filter } from 'rxjs/operators';
import { TrangThaifbService } from './../../../../services/trangthaifb.service';
import { BaiDangfbService } from './../../../../services/baidangfb.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-modal-baidangfacebook',
  templateUrl: './modal-baidangfacebook.component.html',
  styleUrls: ['./modal-baidangfacebook.component.css'],
})
export class ModalBaidangfacebookComponent implements OnInit {
  data: any;
  trangthai: any;
  setTrangthai: any;
  //Khai báo list
  public posttams: any;
  public addForm: FormGroup;
  constructor(
    private modalService: ModalService,
    private baiDangService: BaiDangfbService,
    private trangthaifbSV: TrangThaifbService
  ) {}
  searchpage;
  ngOnInit(): void {
    this.addForm = new FormGroup({
      trangThai: new FormControl(''),
      theLoai: new FormControl(),
    });
    this.getAll();
    this.getTrangthai();
    this.changedTrangThai();
    this.changeTrangthai();
  }

  getAll() {
    this.baiDangService.getAll().subscribe((data) => {
      this.data = data;
      this.posttams = data;
    });
  }

  getTrangthai(){
    this.trangthaifbSV.getAll().subscribe((trangthai) => {
      this.trangthai = trangthai;
    });
  }

  changeTrangthai(){

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

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
