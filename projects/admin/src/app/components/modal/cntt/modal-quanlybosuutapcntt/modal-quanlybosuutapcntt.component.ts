import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { CnttBoSuuTapService } from '../../../../services/cntt/bosuutap.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-quanlybosuutapcntt',
  templateUrl: './modal-quanlybosuutapcntt.component.html',
  styleUrls: ['./modal-quanlybosuutapcntt.component.css'],
})
export class ModalQuanlybosuutapcnttComponent implements OnInit {
  BoSuuTap: any = [];
  submitted = false;
  MaBST: any = ['BST01', 'BST02'];
  _id: any;
  imgValue: any;
  showContent: any;
  dtOptions: DataTables.Settings = {};
  constructor(
    private modalService: ModalService,
    public fb: FormBuilder,
    private cnttBoSuuTapService: CnttBoSuuTapService,
    private toastrService: ToastrService
  ) {
    this.loadDanhSachBST();
  }
  onFileSelected(event) {
    if (event.target.files.length > 0) {
      this.imgValue = event.target.files[0];
    }
    if (event.target.files[0].size > 2097152) {
      // alert("File yêu cầu nhỏ hơn 2MB");
      this.toastrService.error('File yêu cầu nhỏ hơn 2MB', 'Thông báo', {
        timeOut: 4000,
      });
    }
  }

  public boSuuTapForm = new FormGroup({
    _id: new FormControl(),
    maBST: new FormControl(),
    url: new FormControl(),
    alt: new FormControl(),
    trangThai: new FormControl(),
  });

  logo: any;
  onSave(): void {
    if (!this.boSuuTapForm.value._id) {
      const formData = new FormData();
      formData.append('image', this.imgValue);
      formData.append('maBST', this.boSuuTapForm.get('maBST').value);
      formData.append('alt', this.boSuuTapForm.get('alt').value);
      formData.append('url', this.boSuuTapForm.get('url').value);
      // console.log(this.imgValue);
      this.cnttBoSuuTapService.onSave(formData).subscribe((data) => {
        this.loadDanhSachBST();
        this.onResetFormValue();
        this.toastrService.success('Thêm item thành công !', 'Thông báo', {
          timeOut: 4000,
        });
      });
    } else {
      const formData = new FormData();
      formData.append('_id', this.boSuuTapForm.value._id);
      formData.append('image', this.imgValue);
      formData.append('maBST', this.boSuuTapForm.get('maBST').value);
      formData.append('alt', this.boSuuTapForm.get('alt').value);
      formData.append('url', this.boSuuTapForm.get('url').value);
      // console.log(this.imgValue);
      this.cnttBoSuuTapService.editItemTienIch(formData).subscribe((data) => {
        this.loadDanhSachBST();
        this.onResetFormValue();
        this.toastrService.success('Edit item thành công !', 'Thông báo', {
          timeOut: 4000,
        });
      });
    }
  }
  chonMaBoSuuTap(e) {
    this.boSuuTapForm.get('maBST').setValue(e, {
      onlySelf: true,
    });
  }
  get myForm() {
    return this.boSuuTapForm.controls;
  }
  get alt() {
    return this.boSuuTapForm.get('alt');
  }
  get maBST() {
    return this.boSuuTapForm.get('maBST');
  }
  get url() {
    return this.boSuuTapForm.get('url');
  }
  onXoaItem(_id: string) {
    const anwser = confirm('Nhấn OK để xoá Item này');
    if (anwser) {
      this.cnttBoSuuTapService
        .deleteItemBST({
          _id: _id,
        })
        .subscribe((data) => {
          this.toastrService.success('Xóa Item thành công!', 'Thông báo', {
            timeOut: 4000,
          });
          this.loadDanhSachBST();
          this.onResetFormValue();
        });
    }
  }
  editBoSuuTap(boSuuTap: any) {
    this.boSuuTapForm.patchValue({
      _id: boSuuTap._id,
      maBST: boSuuTap.maBST,
      url: boSuuTap.url,
      alt: boSuuTap.alt,
      src: boSuuTap.src,
      trangThai: boSuuTap.trangThai,
    });
    // console.log(this.boSuuTapForm.value);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
  ngOnInit(): void {
    setTimeout(() => (this.showContent = true), 250);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
    };
  }
  loadDanhSachBST() {
    this.cnttBoSuuTapService.danhSachItemBST().subscribe((data) => {
      this.BoSuuTap = data.data;
    });
  }
  showTrangThai(trangThai: any): string {
    if (trangThai == 1) {
      return 'Đã đăng';
    }
    return 'Đã xóa';
  }
  onResetFormValue() {
    this.boSuuTapForm.reset();
  }
}
