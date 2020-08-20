import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { LoaibaivietService } from '../../../../services/cntt/loaibaiviet.service';
import { LoaiBaiViet } from '../../../../models/LoaiBaiViet';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-quanlyloaibaivietcntt',
  templateUrl: './modal-quanlyloaibaivietcntt.component.html',
  styleUrls: ['./modal-quanlyloaibaivietcntt.component.css'],
})
export class ModalQuanlyloaibaivietcnttComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private loaiBaiVietService: LoaibaivietService,
    private toastrService: ToastrService
  ) {}

  private _logResult: any;
  private _danhSachLoaiBaiViet: {
    message: string;
    data: LoaiBaiViet[];
  };

  loaiBaiVietForm = new FormGroup({
    maLoaiBaiViet: new FormControl(''),
    tenLoaiBaiViet: new FormControl('', Validators.required),
    tenVietTat: new FormControl('', Validators.required),
  });
  danhSachLoaiBaiViet: LoaiBaiViet[] = [];
  hideButtonChinhSua: Boolean = true;

  ngOnInit(): void {
    this.getDanhSachLoaiBaiViet();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  getDanhSachLoaiBaiViet() {
    this.loaiBaiVietService.getDanhSachLoaiBaiViet().subscribe((data) => {
      this._danhSachLoaiBaiViet = data;
      this.danhSachLoaiBaiViet = this._danhSachLoaiBaiViet.data;
      this.getMaLoaiBaiVietCuoiCung();
    });
  }

  getMaLoaiBaiVietCuoiCung() {
    const obj = this._danhSachLoaiBaiViet.data;
    let maLoaiBaiViet: string;
    if (obj.length > 0) {
      maLoaiBaiViet = obj[obj.length - 1].maLoaiBaiViet;
      const index = parseInt(maLoaiBaiViet.substr(3, maLoaiBaiViet.length));
      if (index < 10) {
        maLoaiBaiViet = 'LBV0' + (index + 1);
      } else {
        maLoaiBaiViet = 'LBV' + (index + 1);
      }
    } else {
      maLoaiBaiViet = 'LBV00';
    }
    this.loaiBaiVietForm.patchValue({
      maLoaiBaiViet: maLoaiBaiViet,
    });
  }

  getInfoLoaiBaiVietCanSua(baiViet: any) {
    this.hideButtonChinhSua = false;
    this.loaiBaiVietForm.patchValue({
      maLoaiBaiViet: baiViet.maLoaiBaiViet,
      tenLoaiBaiViet: baiViet.tenLoaiBaiViet,
      tenVietTat: baiViet.tenVietTat,
    });
  }

  onThemLoaiBaiViet() {
    this.loaiBaiVietService
      .saveNewLoaiBaiViet(this.loaiBaiVietForm.value)
      .subscribe((data) => {
        // this._logResult = data;
        // console.log(this._logResult);
        // alert('Thêm loại bài viết mới thành công');
        this.toastrService.success(
          'Thêm loại bài viết mới thành công',
          'Thông báo',
          {
            timeOut: 4000,
          }
        );
        this.getDanhSachLoaiBaiViet();
        this.onResetFormValue();
      });
    this.loaiBaiVietForm.patchValue({
      tenLoaiBaiViet: '',
      tenVietTat: '',
    });
  }

  onSuaLoaiBaiViet() {
    this.loaiBaiVietService
      .saveEditLoaiBaiViet(this.loaiBaiVietForm.value)
      .subscribe((data) => {
        // this._logResult = data;
        // console.log(this._logResult);
        // alert('Chỉnh sửa loại bài viết thành công');
        this.toastrService.success(
          'Chỉnh sửa loại bài viết mới thành công',
          'Thông báo',
          {
            timeOut: 4000,
          }
        );
        this.getDanhSachLoaiBaiViet();
        this.onResetFormValue();
      });
  }

  onXoaLoaiBaiViet(maLoaiBaiViet: string) {
    const anwser = confirm('Nhấn OK để xoá Loại bài viết này');
    if (anwser) {
      this.loaiBaiVietService
        .deleteLoaiBaiViet({
          maLoaiBaiViet: maLoaiBaiViet,
        })
        .subscribe((data) => {
          // this._logResult = data;
          // console.log(this._logResult);
          // alert('Xoá loại bài viết thành công');
          this.toastrService.success(
            'Xoá loại bài viết mới thành công',
            'Thông báo',
            {
              timeOut: 4000,
            }
          );
          this.getDanhSachLoaiBaiViet();
        });
    }
  }

  onResetFormValue() {
    this.hideButtonChinhSua = true;
    this.loaiBaiVietForm.reset();
  }
  get tenLoaiBaiViet() {
    return this.loaiBaiVietForm.get('tenLoaiBaiViet');
  }
  get tenVietTat() {
    return this.loaiBaiVietForm.get('tenVietTat');
  }
}
