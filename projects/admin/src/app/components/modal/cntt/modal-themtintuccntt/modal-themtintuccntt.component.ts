import { Component, OnInit, NgZone } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { TintucCnttService } from '../../../../services/cntt/tintuc-cntt.service'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-themtintuccntt',
  templateUrl: './modal-themtintuccntt.component.html',
  styleUrls: ['./modal-themtintuccntt.component.css']
})
export class ModalThemtintuccnttComponent implements OnInit {


  public Editor = ClassicEditor;
  public editorValue: string = '';

  submitted = false;
  tinTucForm: FormGroup;
  loaiBaiViet: any = ['Thông báo', 'Bài Viết nổi bật', 'Tài liệu', 'Việc làm', 'Bài viết'];
  maDanhMuc: any = ['Thông báo', 'Sinh Viên', 'Giới thiệu'];
  TinTuc: any = [];

  constructor(private modalService: ModalService, public fb: FormBuilder, private router: Router, private ngZone: NgZone, private tintucCnttService: TintucCnttService) {
    this.mainForm();
  }

  ngOnInit(): void {
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
          console.log(' Tin tuc duoc them thanh cong!    ', res )
          alert(' Them moi thanh cong')
          
        })
        
    }
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }

}
