import { Component, OnInit, NgZone } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { TintucCnttService } from '../../../../services/cntt/tintuc-cntt.service'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
const URL = 'https://localhost:4100/api/cnttTinTuc/uploads';

@Component({
  selector: 'app-modal-quanlytintuccntt',
  templateUrl: './modal-quanlytintuccntt.component.html',
  styleUrls: ['./modal-quanlytintuccntt.component.css']
})
export class ModalQuanlytintuccnttComponent implements OnInit {
  TinTuc: any = [];
  //update()
  public Editor = ClassicEditor;
  public editorValue: string = '';

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'
  });
  submitted = false;
  tinTucForm: FormGroup;
  loaiBaiViet: any = ['Thông báo', 'Bài Viết nổi bật', 'Tài liệu', 'Việc làm', 'Bài viết'];
  maDanhMuc: any = ['Thông báo', 'Sinh Viên', 'Giới thiệu'];
  trangThai: any = [0, 1, 2];
  thongBaoKhanCap: any = [true, false]
  showContent: any;
  dtOptions: DataTables.Settings = {};
  //
  constructor(private modalService: ModalService, public fb: FormBuilder, private router: Router, private ngZone: NgZone, private tintucCnttService: TintucCnttService, private toastr: ToastrService) {
    this.loadDanhSachTinTuc()
    this.mainForm();
  }
  //update
  mainForm() {
    this.tinTucForm = this.fb.group({
      _id: ['', [Validators.required]],
      loaiBaiViet: ['', [Validators.required]],
      maDanhMuc: ['',],
      maBaiViet: [''],
      tieuDe: ['', [Validators.required]],
      moTaNgan: ['', [Validators.required]],
      noiDung: [''],
      anhBia: [''],
      nguoiViet: [''],
      thoiGianDangBai: [''],
      thongBaoKhanCap: [''],
      created_at: [''],
      updated_at: [''],
      trangThai: [''],
    })
  }
 
  //  dropdown
  chonMaDanhMuc(e) {
    this.tinTucForm.get('maDanhMuc').setValue(e, {
      onlySelf: true
    })
  }
  chonLoaiBaiViet(e) {
    this.tinTucForm.get('loaiBaiViet').setValue(e, {
      onlySelf: true
    })
  }
  chonTrangThai(e) {
    this.tinTucForm.get('trangThai').setValue(e, {
      onlySelf: true
    })
  }
  chonThongBaoKhanCap(e) {
    this.tinTucForm.get('thongBaoKhanCap').setValue(e, {
      onlySelf: true
    })
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
      this.tintucCnttService.editTinTuc(this.tinTucForm.value).subscribe(
        (res) => {
          this.loadDanhSachTinTuc()
          console.log(' Tin tuc duoc chinh sua thanh cong!    ', res)
          this.toastr.success('Chỉnh sửa bài viết thành công!');
        })
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
      _id: baiViet.loaiBaiViet,
      loaiBaiViet: baiViet.loaiBaiViet,
      maDanhMuc: baiViet.maDanhMuc,
      maBaiViet: baiViet.maBaiViet,
      tieuDe: baiViet.tieuDe,
      moTaNgan: baiViet.moTaNgan,
      noiDung: baiViet.noiDung,
      thongBaoKhanCap: baiViet.thongBaoKhanCap,
      trangThai: baiViet.trangThai,
    });
  }
  //
  closeModal(id: string) {
    this.modalService.close(id)
  }
  openModal(id: string) {
    this.modalService.open(id)
  }
  ngOnInit(): void {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      this.toastr.success('File successfully uploaded!');
    };
    setTimeout(()=>this.showContent=true, 250);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }
  loadDanhSachTinTuc() {
    this.tintucCnttService.danhSachTinTuc().subscribe((data) => {
      this.TinTuc = data;
    })
  }
}