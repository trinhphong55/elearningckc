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
  selector: 'app-modal-themtintuccntt',
  templateUrl: './modal-themtintuccntt.component.html',
  styleUrls: ['./modal-themtintuccntt.component.css']
})
export class ModalThemtintuccnttComponent implements OnInit {


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
  TinTuc: any = [];
  trangThai: any=[0,1,2];
  thongBaoKhanCap: any=[true, false]
  constructor(private modalService: ModalService, public fb: FormBuilder, private router: Router, private ngZone: NgZone, private tintucCnttService: TintucCnttService, private toastr: ToastrService) {
    this.mainForm();
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      this.toastr.success('File successfully uploaded!');
    };
  }

  mainForm() {
    this.tinTucForm = this.fb.group({
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
  loadDanhSachTinTuc() {
    this.tintucCnttService.danhSachTinTuc().subscribe((data) => {
      this.TinTuc = data;
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
      this.tintucCnttService.themTinTuc(this.tinTucForm.value).subscribe(
        (res) => {
          this.loadDanhSachTinTuc()
          console.log(' Tin tuc duoc them thanh cong!    ', res)
          this.toastr.success('Thêm mới bài viết thành công!');

        })

    }
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }

}
