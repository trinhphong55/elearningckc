import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { ChuDeService } from '../../../../services/ttth/chude.service';

@Component({
  selector: 'app-modal-ttthchude',
  templateUrl: './modal-ttthchude.component.html',
  styleUrls: ['./modal-ttthchude.component.css'],
})
export class ModalTtthchudeComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private chuDeService: ChuDeService
  ) {}

  private _danhSachChuDe: {
    message: string;
    data: any[];
  };

  public chuDeForm = new FormGroup({
    maChuDe: new FormControl(''),
    tenChuDe: new FormControl('', Validators.required),
    tenVietTat: new FormControl('', Validators.required),
  });
  public danhSachChuDe: any = [];
  public hideButtonChinhSua: Boolean = true;

  ngOnInit(): void {
    this.getdanhSachChuDe();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  getdanhSachChuDe() {
    this.chuDeService.getDanhSachChuDe().subscribe((data) => {
      this._danhSachChuDe = data;
      this.danhSachChuDe = this._danhSachChuDe.data;
      // console.log(this._danhSachChuDe);
      this.getMaChuDeCuoiCung();
      // console.log(this.chuDeForm.value);
    });
  }

  getMaChuDeCuoiCung() {
    const obj = this._danhSachChuDe.data;
    let maChuDe: string;
    if (obj.length > 0) {
      maChuDe = obj[obj.length - 1].maChuDe;
      const index = parseInt(maChuDe.substr(2, maChuDe.length));
      if (index < 10) {
        maChuDe = 'CD0' + (index + 1);
      } else {
        maChuDe = 'CD' + (index + 1);
      }
    } else {
      maChuDe = 'CD00';
    }
    this.chuDeForm.patchValue({
      maChuDe: maChuDe,
    });
  }

  getInfoChuDeCanSua(baiViet: any) {
    this.hideButtonChinhSua = false;
    this.chuDeForm.patchValue({
      maChuDe: baiViet.maChuDe,
      tenChuDe: baiViet.tenChuDe,
      tenVietTat: baiViet.tenVietTat,
    });
  }

  onThemChuDe() {
    this.chuDeService.saveNewChuDe(this.chuDeForm.value).subscribe((data) => {
      alert('Thêm chủ đề mới thành công');
      this.getdanhSachChuDe();
    });
    this.chuDeForm.patchValue({
      tenChuDe: '',
      tenVietTat: '',
    });
  }

  onSuaChuDe() {
    this.chuDeService.saveEditChuDe(this.chuDeForm.value).subscribe((data) => {
      alert('Chỉnh sửa chủ đề thành công');
      this.onResetFormValue();
      this.getdanhSachChuDe();
    });
  }

  onXoaChuDe(maChuDe: string) {
    const anwser = confirm('Nhấn OK để xoá chủ đề này');
    if (anwser) {
      this.chuDeService
        .deleteChuDe({
          maChuDe: maChuDe,
        })
        .subscribe((data) => {
          alert('Xoá chủ đề thành công');
          this.getdanhSachChuDe();
        });
    }
  }

  onResetFormValue() {
    this.hideButtonChinhSua = true;
    this.chuDeForm.patchValue({
      tenChuDe: '',
      tenVietTat: '',
    });
  }
}
