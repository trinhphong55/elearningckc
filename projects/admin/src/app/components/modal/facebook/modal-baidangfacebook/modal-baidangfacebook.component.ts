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
  post: any;
  loai: any;
  maloai: any;
  //Khai báo list
  public posttams: any;
  public trangthaitamlist = [];
  public loaitamlist = [];
  public maloaitamlist = [];

  public addForm: FormGroup;
  constructor(
    private modalService: ModalService,
    private baiDangService: BaiDangfbService
  ) {}
  searchpage;
  ngOnInit(): void {
    this.addForm = new FormGroup({
      trangThai: new FormControl(''),
      theLoai:new FormControl,
    });
    this.getAll();
    this.getLoai();
    this.getMaLoai();
    this.getTrangThai();
    this.changedTrangThai();
  }

  getAll() {
    this.baiDangService.getAll().subscribe((data) => {
      this.data = data;
      this.posttams = data;
    });
  }
  getTrangThai() {
    this.baiDangService.getAll().subscribe((trangthai) => {
      this.trangthai = trangthai;
      console.log(trangthai)
      this.trangthaitamlist = this.trangthai;
    });
  }
  //bắt sự kiện show post theo trạng thái
  changedTrangThai() {
    this.posttams = [];
    // console.log(this.addForm.value.trangThai)
    // console.log(this.addForm.value.theLoai)

    if (this.addForm.value.trangThai !== '') {
      this.data.forEach((element) => {
        if (element.trangThai == this.addForm.value.trangThai) {
          this.posttams.push(element);
        }
      });
    }
    else{
      this.posttams=this.data;
    }

    // if (this.addForm.value.theLoai !== '') {
    //   this.data.forEach((element) => {
    //     if (element.maLoai == this.addForm.value.theLoai) {
    //       this.posttams.push(element);
    //     }
    //   });
    // }

    console.log(this.posttams);
  }
  getMaLoai() {
    this.baiDangService.getAll().subscribe((maLoai) => {
      this.maloai = maLoai;
      this.maloaitamlist = this.loai;
    });
  }
  getLoai() {
    this.baiDangService.getAll().subscribe((loai) => {
      this.loai = loai;
      this.loaitamlist = this.loai;
    });
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
}
