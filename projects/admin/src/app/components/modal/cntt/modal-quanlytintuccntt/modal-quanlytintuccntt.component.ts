import { Component, OnInit, NgZone } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { TintucCnttService } from '../../../../services/cntt/tintuc-cntt.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { DanhmucService } from '../../../../services/cntt/danhmuc.service';
import { LoaibaivietService } from '../../../../services/cntt/loaibaiviet.service';

const URL = 'https://localhost:4100/api/cnttTinTuc/uploads';

@Component({
  selector: 'app-modal-quanlytintuccntt',
  templateUrl: './modal-quanlytintuccntt.component.html',
  styleUrls: ['./modal-quanlytintuccntt.component.css'],
})
export class ModalQuanlytintuccnttComponent implements OnInit {
  TinTuc: any = [];
  //update()
  public Editor = ClassicEditor;
  public editorValue: string = '';

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image',
  });
  submitted = false;
  tinTucForm: FormGroup;
  loaiBaiViet: any = [];

  maDanhMuc: any = [];
  trangThai: any = [0, 1, 2];
  showContent: any;
  dtOptions: DataTables.Settings = {};
  imgValue: any;
  viTriHienThi: any = [
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

  constructor(
    private modalService: ModalService,
    public fb: FormBuilder,
    private tintucCnttService: TintucCnttService,
    private toastr: ToastrService,
    private danhMucService: DanhmucService,
    private loaiBaiVietService: LoaibaivietService
  ) {
    this.loadDanhSachTinTuc();
    this.mainForm();
  }
  onFileSelected(event) {
    if (event.target.files.length > 0) {
      this.imgValue = event.target.files[0].name;
      // console.log('imgValue ' + this.imgValue);
    }
  }
  //update
  mainForm() {
    this.tinTucForm = this.fb.group({
      _id: [''],
      loaiBaiViet: ['-1'],
      maDanhMuc: ['-1'],
      maBaiViet: [''],
      tieuDe: [''],
      moTaNgan: [''],
      noiDung: [''],
      anhBia: this.imgValue,
      nguoiViet: [''],
      thoiGianDangBai: [''],
      viTriHienThi: ['-1'],
      trangThai: [''],
    });
  }
  get maBaiViet() { return this.tinTucForm.get('maBaiViet'); }
  get tieuDe() { return this.tinTucForm.get('tieuDe'); }
  get moTaNgan() { return this.tinTucForm.get('moTaNgan'); }
  get noiDung() { return this.tinTucForm.get('noiDung'); }
  //  dropdown
  chonMaDanhMuc(e) {
    this.tinTucForm.get('maDanhMuc').setValue(e, {
      onlySelf: true,
    });
  }
  chonLoaiBaiViet(e) {
    this.tinTucForm.get('loaiBaiViet').setValue(e, {
      onlySelf: true,
    });
  }
  chonTrangThai(e) {
    this.tinTucForm.get('trangThai').setValue(e, {
      onlySelf: true,
    });
  }
  chonViTriHienThi(e) {
    this.tinTucForm.get('viTriHienThi').setValue(e, {
      onlySelf: true,
    });
  }
  // Getter to access form control
  get myForm() {
    return this.tinTucForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (!this.tinTucForm.valid) {
      return false;
    } else {
      this.tintucCnttService
        .editTinTuc(this.tinTucForm.value)
        .subscribe((res) => {
          this.loadDanhSachTinTuc();
          // console.log(' Tin tuc duoc chinh sua thanh cong!', res);
          this.toastr.success('Chỉnh sửa bài viết thành công!');
        });
    }
  }
  onXoaBaiViet(maBaiViet: string) {
    const anwser = confirm('Nhấn OK để xoá Loại bài viết này');
    if (anwser) {
      this.tintucCnttService
        .deleteTinTuc({
          maBaiViet: maBaiViet,
        })
        .subscribe((data) => {
          this.toastr.success('Xóa bài viết thành công!');
          this.loadDanhSachTinTuc();
        });
    }
  }
  editBaiViet(baiViet: any) {
    this.tinTucForm.patchValue({
      _id: baiViet._id,
      loaiBaiViet: baiViet.loaiBaiViet,
      maDanhMuc: baiViet.maDanhMuc,
      maBaiViet: baiViet.maBaiViet,
      tieuDe: baiViet.tieuDe,
      moTaNgan: baiViet.moTaNgan,
      noiDung: baiViet.noiDung,
      viTriHienThi: baiViet.viTriHienThi,
      trangThai: baiViet.trangThai,
    });
    // console.log(this.tinTucForm.value);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
  openModal(id: string) {
    this.modalService.open(id);
  }
  ngOnInit(): void {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    setTimeout(() => (this.showContent = true), 250);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
    };
    this.getDanhSachDanhMuc();
    this.getDanhSachLoaiBaiViet();
  }
  loadDanhSachTinTuc() {
    this.tintucCnttService.danhSachTinTuc().subscribe((data) => {
      this.TinTuc = data.data;
    });
  }

  getDanhSachDanhMuc(): void {
    this.danhMucService.getDanhSachDanhMuc().subscribe((data) => {
      this.maDanhMuc = data.data;
    });
  }

  getDanhSachLoaiBaiViet(): void {
    this.loaiBaiVietService.getDanhSachLoaiBaiViet().subscribe((data) => {
      this.loaiBaiViet = data.data;
    });
  }
}
