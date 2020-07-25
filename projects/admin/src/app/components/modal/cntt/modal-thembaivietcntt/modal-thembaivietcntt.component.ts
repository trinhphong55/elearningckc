import { Component, OnInit, NgZone } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { cnttBaiVietService } from '../../../../services/cntt/tintuc-cntt.service'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';

const URL = 'https://localhost:4100/api/cnttBaiViet/upload';
@Component({
  selector: 'app-modal-thembaivietcntt',
  templateUrl: './modal-thembaivietcntt.component.html',
  styleUrls: ['./modal-thembaivietcntt.component.css']
})
export class ModalThembaivietcnttComponent implements OnInit {


  public Editor = ClassicEditor;
  public editorValue: string = '';

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'
  });

  submitted = false;
  BaiVietForm: FormGroup;
  loaiBaiViet: any = ['Thông báo', 'Bài Viết nổi bật', 'Tài liệu', 'Việc làm', 'Bài viết'];
  maDanhMuc: any = ['Thông báo', 'Sinh Viên', 'Giới thiệu'];
  TinTuc: any = [];

  constructor(private modalService: ModalService, public fb: FormBuilder, private router: Router, private ngZone: NgZone, private cnttBaiVietService: cnttBaiVietService, private toastr: ToastrService) {
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
    this.BaiVietForm = this.fb.group({
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
    this.BaiVietForm.get('maDanhMuc').setValue(e, {
      onlySelf: true
    })
  }
  chonLoaiBaiViet(e) {
    this.BaiVietForm.get('loaiBaiViet').setValue(e, {
      onlySelf: true
    })
  }
  loadDanhSachTinTuc() {
    this.cnttBaiVietService.danhSachTinTuc().subscribe((data) => {
      this.TinTuc = data;
    })
  }
  // Getter to access form control
  get myForm() {
    return this.BaiVietForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.BaiVietForm.valid) {
      return false;
    } else {
      this.cnttBaiVietService.themTinTuc(this.BaiVietForm.value).subscribe(
        (res) => {
          this.loadDanhSachTinTuc()
          console.log(' Tin tuc duoc them thanh cong!    ', res)
          alert(' Them moi thanh cong')

        })

    }
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }

}
