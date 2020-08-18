import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { DanhmucService } from '../../../../services/cntt/danhmuc.service';

@Component({
  selector: 'app-modal-danhmucbaiviet',
  templateUrl: './modal-danhmucbaiviet.component.html',
  styleUrls: ['./modal-danhmucbaiviet.component.css'],
})
export class ModalDanhmucbaivietComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private danhMucService: DanhmucService
  ) {}

  private _danhSachDanhMuc: {
    message: string;
    data: any[];
  };

  danhMucForm = new FormGroup({
    maDanhMuc: new FormControl(''),
    tenDanhMuc: new FormControl('', Validators.required),
    tenVietTat: new FormControl('', Validators.required),
  });
  danhSachDanhMuc: any = [];
  hideButtonChinhSua: Boolean = true;

  ngOnInit(): void {
    this.getdanhSachDanhMuc();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  getdanhSachDanhMuc() {
    this.danhMucService.getDanhSachDanhMuc().subscribe((data) => {
      this._danhSachDanhMuc = data;
      this.danhSachDanhMuc = this._danhSachDanhMuc.data;
      // console.log(this._danhSachDanhMuc);
      this.getMaDanhMucCuoiCung();
    });
  }

  getMaDanhMucCuoiCung() {
    const obj = this._danhSachDanhMuc.data;
    let maDanhMuc: string;
    if (obj.length > 0) {
      maDanhMuc = obj[obj.length - 1].maDanhMuc;
      const index = parseInt(maDanhMuc.substr(2, maDanhMuc.length));
      if (index < 10) {
        maDanhMuc = 'DM0' + (index + 1);
      } else {
        maDanhMuc = 'DM' + (index + 1);
      }
    } else {
      maDanhMuc = 'DM00';
    }
    this.danhMucForm.patchValue({
      maDanhMuc: maDanhMuc,
    });
  }

  getInfoDanhMucCanSua(baiViet: any) {
    this.hideButtonChinhSua = false;
    this.danhMucForm.patchValue({
      maDanhMuc: baiViet.maDanhMuc,
      tenDanhMuc: baiViet.tenDanhMuc,
      tenVietTat: baiViet.tenVietTat,
    });
  }

  onThemDanhMuc() {
    this.danhMucService
      .saveNewDanhMuc(this.danhMucForm.value)
      .subscribe((data) => {
        alert('Thêm danh mục mới thành công');
        this.getdanhSachDanhMuc();
        this.onResetFormValue();
      });
  }

  onSuaDanhMuc() {
    this.danhMucService
      .saveEditDanhMuc(this.danhMucForm.value)
      .subscribe((data) => {
        alert('Chỉnh sửa danh mục thành công');
        this.getdanhSachDanhMuc();
        this.onResetFormValue();
      });
  }

  onXoaDanhMuc(maDanhMuc: string) {
    const anwser = confirm('Nhấn OK để xoá danh mục này');
    if (anwser) {
      this.danhMucService
        .deleteDanhMuc({
          maDanhMuc: maDanhMuc,
        })
        .subscribe((data) => {
          alert('Xoá danh mục thành công');
          this.getdanhSachDanhMuc();
        });
    }
  }

  onResetFormValue() {
    this.hideButtonChinhSua = true;
    this.danhMucForm.reset();
  }
  showTrangThai(trangThai: any): string {
    if (trangThai == 1) { return 'Đã đăng' }
    return 'Đã xóa'
  }
  get tenDanhMuc() { return this.danhMucForm.get('tenDanhMuc'); }
  get tenVietTat() { return this.danhMucForm.get('tenVietTat'); }
}
