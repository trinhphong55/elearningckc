import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { CnttBoSuuTapService } from '../../../../services/cntt/bosuutap.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
const URL = 'https://localhost:4100/api/cnttbosuutap/uploads';

@Component({
  selector: 'app-modal-quanlybosuutapcntt',
  templateUrl: './modal-quanlybosuutapcntt.component.html',
  styleUrls: ['./modal-quanlybosuutapcntt.component.css']
})
export class ModalQuanlybosuutapcnttComponent implements OnInit {
  BoSuuTap: any = [];
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image',
  });
  submitted = false;
  boSuuTapForm: FormGroup;
  MaBST: any = [1, 2];
  imgValue: any;
  showContent: any;
  dtOptions: DataTables.Settings = {};
  constructor(private modalService: ModalService,
    public fb: FormBuilder,
    private cnttBoSuuTapService: CnttBoSuuTapService,
    private toastr: ToastrService,) {
    this.loadDanhSachBST();
    this.mainForm();
  }
  onFileSelected(event) {
    if (event.target.files.length > 0) {
      this.imgValue = event.target.files[0].name;
      console.log('imgValue ' + this.imgValue);
    }
  }
  mainForm() {
    this.boSuuTapForm = this.fb.group({
      _id: [''],
      maBST: [''],
      url: [''],
      alt: [''],
      src: this.imgValue,
      trangThai: [''],
    });
  }
  chonMaBoSuuTap(e) {
    this.boSuuTapForm.get('maBST').setValue(e, {
      onlySelf: true,
    });
  }
  get myForm() {
    return this.boSuuTapForm.controls;
  }
  onSubmit() {
  }
  onXoaBaiViet(maBST: string) {
  }
  editBaiViet(boSuuTap: any) {
    this.boSuuTapForm.patchValue({
      _id: boSuuTap._id,
      maBST: boSuuTap.maBST,
      url: boSuuTap.url,
      alt: boSuuTap.alt,
      src: boSuuTap.src,
      trangThai: boSuuTap.trangThai,
    });
    console.log(this.boSuuTapForm.value);
  }
  closeModal(id: string) {
    this.modalService.close(id);
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
  }
  loadDanhSachBST() {
    this.cnttBoSuuTapService.danhSachBST().subscribe((data) => {
      this.BoSuuTap = data.data;
    });
  }

}
