import { Component, OnInit } from '@angular/core';
import { TienIchSinhVienCnttService } from '../../../../services/cntt/tienich.service';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from '../../../../services/modal.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal-quanlytienichcntt',
  templateUrl: './modal-quanlytienichcntt.component.html',
  styleUrls: ['./modal-quanlytienichcntt.component.css']
})
export class ModalQuanlytienichcnttComponent implements OnInit {
  TienIch: any = [];
  submitted = false;
  tienIchForm: FormGroup;
  showContent: any;
  dtOptions: DataTables.Settings = {};
  //submitted = false;
  constructor(private modalService: ModalService,
    public fb: FormBuilder,
    private tienIchSinhVienCnttService: TienIchSinhVienCnttService,
    private toastr: ToastrService) {
    this.loadDanhSachTienIch();
    this.mainForm();
  }
  mainForm() {
    this.tienIchForm = this.fb.group({
      _id: [''],
      maTienIch: [''],
      tenTienIch: [''],
      urlTienIch: [''],
      iconClassTienIch: [''],
      maMauTienIch: [''],
      trangThai: [''],
    });
  }
  chonTrangThai(e) {
    this.tienIchForm.get('trangThai').setValue(e, {
      onlySelf: true,
    });
  }
  get myForm() {
    return this.tienIchForm.controls;
  }

  ngOnInit(): void {
    setTimeout(() => (this.showContent = true), 250);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
    };
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
  loadDanhSachTienIch() {
    this.tienIchSinhVienCnttService.danhSachTienIch().subscribe((data) => {
      this.TienIch = data.data;
    });
  }
  onXoaTienIch(maTienIch: string) {
    const anwser = confirm('Nhấn OK để xoá Loại bài viết này');
    if (anwser) {
      this.tienIchSinhVienCnttService
        .deleteTienIch({
          maTienIch: maTienIch,
        })
        .subscribe((data) => {
          this.toastr.success('Xóa bài viết thành công!');
          this.loadDanhSachTienIch();
        });
    }
  }
  editTienIch(tienich: any) {
    this.tienIchForm.patchValue({
      _id: tienich._id,
      maTienIch: tienich.maTienIch,
      tenTienIch: tienich.tenTienIch,
      urlTienIch: tienich.urlTienIch,
      iconClassTienIch: tienich.iconClassTienIch,
      maMauTienIch: tienich.maMauTienIch,
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.tienIchForm.value._id.length > 0) {
      if (!this.tienIchForm.valid) {
        return false;
      } else {
        this.tienIchSinhVienCnttService
          .editTienIch(this.tienIchForm.value)
          .subscribe((res) => {
            this.loadDanhSachTienIch();
            console.log(' Tin tuc duoc chinh sua thanh cong!', res);
            this.toastr.success('Chỉnh sửa bài viết thành công!');
          });
      }
    } else {
      if (!this.tienIchForm.valid) {
        return false;
      } else {
        this.tienIchSinhVienCnttService
          .themTienIch(this.tienIchForm.value)
          .subscribe((res) => {
            this.loadDanhSachTienIch();
            console.log(' Tien ich duoc them thanh cong!', res);
            this.toastr.success('Thêm tiện ích thành công !');
          });
      }
    }

  }
}
