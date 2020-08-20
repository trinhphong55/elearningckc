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
  selector: 'app-modal-themtintuccntt',
  templateUrl: './modal-themtintuccntt.component.html',
  styleUrls: ['./modal-themtintuccntt.component.css'],
})
export class ModalThemtintuccnttComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    public fb: FormBuilder,
    private tintucCnttService: TintucCnttService,
    private toastr: ToastrService,
    private danhMucService: DanhmucService,
    private loaiBaiVietService: LoaibaivietService
  ) {
    this.mainForm();
  }

  public Editor = ClassicEditor;
  public editorValue: string = '';
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image',
  });
  submitted = false;
  tinTucForm: FormGroup;
  LoaiBaiViet: any = [];
  MaDanhMuc: any = [];
  TinTuc: any = [];
  trangThai: any = [0, 1, 2];
  ViTriHienThi: any = [
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
  imgValue: any;

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.getDanhSachDanhMuc();
    this.getDanhSachLoaiBaiViet();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  logData(): void {
    // console.log('danh muc');
    // console.log(this.maDanhMuc);
    // console.log('loai bai viet');
    // console.log(this.loaiBaiViet);
    // console.log(this.tinTucForm.value);
    // console.log(this.ViTriHienThi);
  }

  // getDanhSachViTriHienThi(): void {
  //   this.viTriHienThi = this.viTriHienThiService.getDanhSachViTri();
  // }

  getDanhSachDanhMuc(): void {
    this.danhMucService.getDanhSachDanhMuc().subscribe((data) => {
      this.MaDanhMuc = data.data;
    });
  }

  getDanhSachLoaiBaiViet(): void {
    this.loaiBaiVietService.getDanhSachLoaiBaiViet().subscribe((data) => {
      this.LoaiBaiViet = data.data;
    });
  }

  onFileSelected(event) {
    if (event.target.files.length > 0) {
      this.imgValue = event.target.files[0].name;
      // console.log('imgValue ' + this.imgValue);
    }
  }

  mainForm() {
    this.tinTucForm = this.fb.group({
      loaiBaiViet: ['-1',Validators.required],
      maDanhMuc: ['-1',Validators.required],
      maBaiViet: ['',Validators.required],
      tieuDe: ['',Validators.required],
      moTaNgan: ['',Validators.required],
      noiDung: ['',Validators.required],
      anhBia: this.imgValue,
      nguoiViet: [''],
      thoiGianDangBai: [''],
      viTriHienThi: ['-1'],
    });
  }
  get maBaiViet() { return this.tinTucForm.get('maBaiViet'); }
  get tieuDe() { return this.tinTucForm.get('tieuDe'); }
  get moTaNgan() { return this.tinTucForm.get('moTaNgan'); }
  get noiDung() { return this.tinTucForm.get('noiDung'); }
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

  loadDanhSachTinTuc() {
    this.tintucCnttService.danhSachTinTuc().subscribe((data) => {
      this.TinTuc = data.data;
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
      // console.log('this.tinTucForm.value)' + this.tinTucForm.value);
      this.tintucCnttService
        .themTinTuc(this.tinTucForm.value)
        .subscribe((res) => {
          this.loadDanhSachTinTuc();
          // console.log(' Tin tuc duoc them thanh cong!', res);
          this.toastr.success('Thêm mới bài viết thành công!');
        });
    }
  }
}
