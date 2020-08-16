import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChuDeService } from '../../../../services/ttth/chude.service';
import { TintucService } from '../../../../services/ttth/tintuc.service';
import { getCookie } from '../../../../../../../common/helper';
import { StringCommonService } from '../../../../services/cntt/stringcommon.service';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-tintuc',
  templateUrl: './modal-tintuc.component.html',
  styleUrls: ['./modal-tintuc.component.css'],
})
export class ModalTintucComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private baiVietService: TintucService,
    private chuDeService: ChuDeService,
    private stringCommonService: StringCommonService
  ) {}

  //#region Khai báo biến
  private _hinhAnhBaiViet: any = null;
  private _hinhAnhKhiChinhSua: any = null;
  private _idBaiVietChinhSua: any;
  public danhSachBaiViet: any = [];
  public danhSachLoaiBaiViet: any = [];
  public danhSachTrangThai: any = [
    { maTrangThai: true, tenTrangThai: 'Hiển thị' },
    { maTrangThai: false, tenTrangThai: 'Đã xoá' },
  ];
  public CKEditor = ClassicEditor;
  public formTaoBaiViet = new FormGroup({
    id_loaitintuc: new FormControl(-1, Validators.required),
    tentintuc: new FormControl(null, Validators.required),
    tentintucASCII: new FormControl(null),
    description: new FormControl(null, Validators.required),
    noidung: new FormControl(null, Validators.required),
    noidungASCII: new FormControl(null),
    thuTuHienThi: new FormControl(999),
    trangthai: new FormControl(true),
  });
  public formChinhSuaBaiViet = new FormGroup({
    id_loaitintuc: new FormControl(null),
    image: new FormControl(null),
    tentintuc: new FormControl(null),
    tentintucASCII: new FormControl(null),
    description: new FormControl(null),
    noidung: new FormControl(null),
    noidungASCII: new FormControl(null),
    thuTuHienThi: new FormControl(null),
    trangthai: new FormControl(null),
  });

  public get image(): string {
    return this.formChinhSuaBaiViet.get('image').value;
  }

  //#endregion

  ngOnInit(): void {
    this.getDanhSachBaiViet();
    this.getDanhSachLoaiBaiViet();
  }

  //#region Các hàm xử lý HTML
  closeModal(id: string) {
    this.modalService.close(id);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  // formTaoBaiViet
  onChangeInputFile(event) {
    if (event.target.files.length > 0) {
      this._hinhAnhBaiViet = event.target.files[0];
    }
  }

  // formChinhSuaBaiViet
  onChangeInputFile2(event) {
    if (event.target.files.length > 0) {
      this._hinhAnhKhiChinhSua = event.target.files[0];
    }
  }

  formatDatetime(time: string): string {
    if (time) {
      time = moment(time).format('HH:mm, DD-MM-YYYY');
      return time;
    }
    return '';
  }

  displayLoaiBaiViet(maLoaiBaiViet: string): string {
    try {
      const loaiBaiViet = this.danhSachLoaiBaiViet.filter(
        (x) => x.maChuDe === maLoaiBaiViet
      );
      return loaiBaiViet[0].tenChuDe;
    } catch (error) {
      return '-1';
    }
  }

  displayTrangThai(maTrangThai: any): string {
    switch (maTrangThai) {
      case false:
        return 'Đã xoá';
      case true:
        return 'Đã đăng';
      default:
        return 'Sai trạng thái';
    }
  }

  displayBaiVietVaoFormChinhSua(baiViet: any): void {
    this.formChinhSuaBaiViet.patchValue({
      id_loaitintuc: baiViet.id_loaitintuc,
      image: baiViet.image,
      tentintuc: baiViet.tentintuc,
      tentintucASCII: baiViet.tentintucASCII,
      description: baiViet.description,
      noidung: baiViet.noidung,
      noidungASCII: baiViet.noidungASCII,
      thuTuHienThi: baiViet.thuTuHienThi,
      trangthai: baiViet.trangthai,
    });
    this._idBaiVietChinhSua = baiViet._id;
  }
  //#endregion

  //#region Các hàm lấy dữ liệu
  getDanhSachBaiViet(): void {
    this.baiVietService.getTinTuc().subscribe((res) => {
      this.danhSachBaiViet = res;
      // console.log(this.danhSachBaiViet);
    });
  }
  getDanhSachLoaiBaiViet(): void {
    this.chuDeService.getDanhSachChuDe().subscribe((data) => {
      this.danhSachLoaiBaiViet = data.data;
      // console.log(this.danhSachLoaiBaiViet);
    });
  }
  //#endregion

  //#region Các hàm xử lý dữ liệu
  luuBaiViet(): void {
    this.formTaoBaiViet
      .get('tentintucASCII')
      .setValue(
        this.stringCommonService.toASCII(
          this.stringCommonService.removeSpaceAndHTMLTag(
            this.formTaoBaiViet.get('tentintuc').value
          )
        )
      );
    this.formTaoBaiViet
      .get('noidungASCII')
      .setValue(
        this.stringCommonService.toASCII(
          this.stringCommonService.removeSpaceAndHTMLTag(
            this.formTaoBaiViet.get('noidung').value
          )
        )
      );
    if (this.formTaoBaiViet.valid && this._hinhAnhBaiViet !== null) {
      //#region FORMDATA
      const _formData = new FormData();
      _formData.append(
        'id_loaitintuc',
        this.formTaoBaiViet.get('id_loaitintuc').value
      );
      _formData.append('photos', this._hinhAnhBaiViet);
      _formData.append('tentintuc', this.formTaoBaiViet.get('tentintuc').value);
      _formData.append(
        'tentintucASCII',
        this.formTaoBaiViet.get('tentintucASCII').value
      );
      _formData.append(
        'description',
        this.formTaoBaiViet.get('description').value
      );
      _formData.append('noidung', this.formTaoBaiViet.get('noidung').value);
      _formData.append(
        'noidungASCII',
        this.formTaoBaiViet.get('noidungASCII').value
      );
      _formData.append(
        'thuTuHienThi',
        this.formTaoBaiViet.get('thuTuHienThi').value
      );
      _formData.append('trangthai', this.formTaoBaiViet.get('trangthai').value);
      _formData.append('nguoitao', getCookie('name'));
      //#endregion

      // new Response(_formData).text().then(console.log); // log form-data

      this.baiVietService.addTinTuc(_formData).subscribe((res) => {
        alert(res.message);
        this.getDanhSachBaiViet();
      });
    } else {
      alert('Vui lòng chọn hình ảnh và nhập đầy đủ các thông tin bài viết');
    }
  }

  chinhSuaBaiViet(): void {
    this.formChinhSuaBaiViet
      .get('tentintucASCII')
      .setValue(
        this.stringCommonService.toASCII(
          this.stringCommonService.removeSpaceAndHTMLTag(
            this.formChinhSuaBaiViet.get('tentintuc').value
          )
        )
      );
    this.formChinhSuaBaiViet
      .get('noidungASCII')
      .setValue(
        this.stringCommonService.toASCII(
          this.stringCommonService.removeSpaceAndHTMLTag(
            this.formChinhSuaBaiViet.get('noidung').value
          )
        )
      );
    if (this.formChinhSuaBaiViet.valid && this._hinhAnhKhiChinhSua !== null) {
      //#region FORMDATA
      const _formData = new FormData();
      _formData.append('_id', this._idBaiVietChinhSua);
      _formData.append(
        'id_loaitintuc',
        this.formChinhSuaBaiViet.get('id_loaitintuc').value
      );
      _formData.append('photos', this._hinhAnhKhiChinhSua);
      _formData.append(
        'tentintuc',
        this.formChinhSuaBaiViet.get('tentintuc').value
      );
      _formData.append(
        'tentintucASCII',
        this.formChinhSuaBaiViet.get('tentintucASCII').value
      );
      _formData.append(
        'description',
        this.formChinhSuaBaiViet.get('description').value
      );
      _formData.append(
        'noidung',
        this.formChinhSuaBaiViet.get('noidung').value
      );
      _formData.append(
        'noidungASCII',
        this.formChinhSuaBaiViet.get('noidungASCII').value
      );
      _formData.append(
        'thuTuHienThi',
        this.formChinhSuaBaiViet.get('thuTuHienThi').value
      );
      _formData.append(
        'trangthai',
        this.formChinhSuaBaiViet.get('trangthai').value
      );
      _formData.append('nguoisua', getCookie('name'));
      //#endregion

      // new Response(_formData).text().then(console.log); // log form-data

      this.baiVietService.suaTinTuc(_formData).subscribe((res) => {
        alert(res.message);
        this.getDanhSachBaiViet();
      });
    } else {
      alert('Vui lòng chọn hình ảnh mới và nhập đầy đủ các thông tin bài viết');
    }
  }

  xoaBaiViet(_id: string): void {
    const anwser = confirm('Nhấn OK để xoá bài viết này');
    if (anwser) {
      this.baiVietService.xoaTinTuc(_id).subscribe((res) => {
        alert(res.message);
        this.getDanhSachBaiViet();
      });
    }
  }
  //#endregion
}
