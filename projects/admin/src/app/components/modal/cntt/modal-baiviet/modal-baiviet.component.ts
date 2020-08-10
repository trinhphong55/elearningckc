import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as moment from 'moment';
import { ModalService } from '../../../../services/modal.service';
import { TintucCnttService } from '../../../../services/cntt/tintuc-cntt.service';
import { DanhmucService } from '../../../../services/cntt/danhmuc.service';
import { LoaibaivietService } from '../../../../services/cntt/loaibaiviet.service';
import { StringCommonService } from '../../../../services/cntt/stringcommon.service';

@Component({
  selector: 'app-modal-baiviet',
  templateUrl: './modal-baiviet.component.html',
  styleUrls: ['./modal-baiviet.component.css'],
})
export class ModalBaivietComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private tintucCnttService: TintucCnttService,
    private danhMucService: DanhmucService,
    private loaiBaiVietService: LoaibaivietService,
    private stringCommonService: StringCommonService
  ) {}

  private _image: any = null;
  public image: any = null;
  // private _maBaiViet: any = null;
  public Editor = ClassicEditor;
  public formBaiViet = new FormGroup({
    _id: new FormControl(null),
    maBaiViet: new FormControl(null, Validators.required),
    anhBia: new FormControl(null),
    maDanhMuc: new FormControl(-1),
    loaiBaiViet: new FormControl(-1),
    tieuDe: new FormControl(null, Validators.required),
    tieuDeASCII: new FormControl(null),
    moTaNgan: new FormControl(null),
    noiDung: new FormControl(null, Validators.required),
    noiDungASCII: new FormControl(null),
    nguoiViet: new FormControl(null),
    thoiGianDangBai: new FormControl(),
    viTriHienThi: new FormControl(-1),
    trangThai: new FormControl(1),
  });
  public danhSachDanhMuc: any = [];
  public danhSachLoaiBaiViet: any = [];
  public danhSachBaiViet: any = [];
  public danhSachTrangThai: any = [
    {
      maTrangThai: 1,
      tenTrangThai: 'Đăng ngay',
    },
    {
      maTrangThai: 2,
      tenTrangThai: 'Chờ phê duyệt',
    },
  ];
  public viTriHienThi: any = [
    {
      maViTri: 0,
      tenViTri: 'Bài viết quan trọng',
    },
    {
      maViTri: 1,
      tenViTri: 'Cơ hội việc làm',
    },
    {
      maViTri: 2,
      tenViTri: 'Giới thiệu ngắn',
    },
    {
      maViTri: 3,
      tenViTri: 'Tin tức nổi bật',
    },
  ];
  public trangThaiCuaForm: Number = 0; // 0: Thêm mới, 1: Chỉnh sửa

  ngOnInit(): void {
    this.getDanhSachBaiViet();
    this.getDanhSachDanhMuc();
    this.getDanhSachLoaiBaiViet();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  getDanhSachBaiViet() {
    this.tintucCnttService.danhSachTinTuc().subscribe((data) => {
      this.danhSachBaiViet = data;
      this.getMaBaiVietCuoiCung();
    });
  }

  getDanhSachDanhMuc(): void {
    this.danhMucService.getDanhSachDanhMuc().subscribe((data) => {
      this.danhSachDanhMuc = data.data;
    });
  }

  getDanhSachLoaiBaiViet(): void {
    this.loaiBaiVietService.getDanhSachLoaiBaiViet().subscribe((data) => {
      this.danhSachLoaiBaiViet = data.data;
    });
  }

  getMaBaiVietCuoiCung(): void {
    const obj = this.danhSachBaiViet.data;
    let _maBaiViet: string;
    if (obj.length > 0) {
      _maBaiViet = obj[obj.length - 1].maBaiViet;
      if (_maBaiViet !== undefined) {
        const index = parseInt(_maBaiViet.substr(2, _maBaiViet.length));
        if (index < 10) {
          _maBaiViet = 'BV0' + (index + 1);
        } else {
          _maBaiViet = 'BV' + (index + 1);
        }
      }
    } else {
      _maBaiViet = 'BV01';
    }
    this.formBaiViet.patchValue({
      maBaiViet: _maBaiViet,
    });
  }

  onFileSelected(event) {
    if (event.target.files.length > 0) {
      this._image = event.target.files[0];
      // console.log(this._image);
    }
  }

  displayViTriHienThi(maViTri: any): string {
    switch (maViTri) {
      case 0:
        return 'Bài viết quan trọng';
      case 1:
        return 'Cơ hội việc làm';
      case 2:
        return 'Giới thiệu ngắn';
      case 3:
        return 'Tin tức nổi bật';
      default:
        return 'Không hiển thị';
    }
  }

  displayTrangThai(maTrangThai: any): string {
    switch (maTrangThai) {
      case 0:
        return 'Đã xoá';
      case 1:
        return 'Đã đăng';
      case 2:
        return 'Chờ phê duyệt';
      default:
        return 'Sai trạng thái';
    }
  }

  displayTenDanhMuc(maDanhMuc: string): string {
    try {
      const danhMuc = this.danhSachDanhMuc.filter(
        (x) => x.maDanhMuc === maDanhMuc
      );
      return danhMuc[0].tenDanhMuc;
    } catch (error) {
      return '-1';
    }
  }

  displayLoaiBaiViet(maLoaiBaiViet: string): string {
    try {
      const loaiBaiViet = this.danhSachLoaiBaiViet.filter(
        (x) => x.maLoaiBaiViet === maLoaiBaiViet
      );
      return loaiBaiViet[0].tenLoaiBaiViet;
    } catch (error) {
      return '-1';
    }
  }

  displayBaiVietCanChinhSua(baiViet: any, image: any): void {
    this.formBaiViet.patchValue(baiViet);
    this.image = image;
    this.trangThaiCuaForm = 1;
  }

  formatDatetime(time: string): string {
    time = moment(time).format('HH:mm, DD-MM-YYYY');
    return time;
  }

  onResetForm(): void {
    this.formBaiViet.reset();
    this._image = null;
    this.trangThaiCuaForm = 0;
  }

  saveBaiViet(): void {
    if (this.formBaiViet.valid && this._image !== null) {
      const tieuDeAfterRemoveHTMLTag = this.stringCommonService.removeSpaceAndHTMLTag(
        this.formBaiViet.get('tieuDe').value
      );
      const noiDungAfterRemoveHTMLTag = this.stringCommonService.removeSpaceAndHTMLTag(
        this.formBaiViet.get('noiDung').value
      );
      this.formBaiViet
        .get('tieuDeASCII')
        .setValue(this.stringCommonService.toASCII(tieuDeAfterRemoveHTMLTag));
      this.formBaiViet
        .get('noiDungASCII')
        .setValue(this.stringCommonService.toASCII(noiDungAfterRemoveHTMLTag));
      // console.log(this._image);

      // FORM DATA
      const formData = new FormData();
      formData.append('maBaiViet', this.formBaiViet.get('maBaiViet').value);
      formData.append('photos', this._image);
      // formData.append(
      //   'thoiGianDangBai',
      //   this.formBaiViet.get('thoiGianDangBai').value
      // );
      formData.append('maDanhMuc', this.formBaiViet.get('maDanhMuc').value);
      formData.append('loaiBaiViet', this.formBaiViet.get('loaiBaiViet').value);
      formData.append('tieuDe', this.formBaiViet.get('tieuDe').value);
      formData.append('tieuDeASCII', this.formBaiViet.get('tieuDeASCII').value);
      formData.append('moTaNgan', this.formBaiViet.get('moTaNgan').value);
      formData.append('noiDung', this.formBaiViet.get('noiDung').value);
      formData.append(
        'noiDungASCII',
        this.formBaiViet.get('noiDungASCII').value
      );
      formData.append('nguoiViet', this.formBaiViet.get('nguoiViet').value);
      formData.append(
        'viTriHienThi',
        this.formBaiViet.get('viTriHienThi').value
      );
      formData.append('trangThai', this.formBaiViet.get('trangThai').value);

      if (this.trangThaiCuaForm === 0) {
        this.tintucCnttService.themTinTuc(formData).subscribe((res) => {
          this.getDanhSachBaiViet();
          this.onResetForm();
          alert(res.message);
        });
      }
      if (this.trangThaiCuaForm === 1) {
        formData.append('_id', this.formBaiViet.get('_id').value);
        this.tintucCnttService.editTinTuc(formData).subscribe((res) => {
          this.getDanhSachBaiViet();
          this.onResetForm();
          alert(res.message);
        });
      }
    } else {
      alert('Vui lòng nhập đầy đủ các thông tin');
    }
  }

  xoaBaiViet(maBaiViet: string): void {
    const anwser = confirm('Nhấn OK để xoá bài viết này');
    if (anwser) {
      this.tintucCnttService
        .deleteTinTuc({
          maBaiViet: maBaiViet,
        })
        .subscribe((res) => {
          this.getDanhSachBaiViet();
          alert('Xoá bài viết thành công');
        });
    }
  }
}
