import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit, // DataTables
  ViewChild, // DataTables
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DataTableDirective } from 'angular-datatables'; // DataTables
import * as moment from 'moment';
import { Subject } from 'rxjs'; // DataTables
import { ModalService } from '../../../../services/modal.service';
import { TintucCnttService } from '../../../../services/cntt/tintuc-cntt.service';
import { DanhmucService } from '../../../../services/cntt/danhmuc.service';
import { LoaibaivietService } from '../../../../services/cntt/loaibaiviet.service';
import { StringCommonService } from '../../../../services/cntt/stringcommon.service';
import { getCookie } from '../../../../../../../common/helper';
@Component({
  selector: 'app-modal-baiviet',
  templateUrl: './modal-baiviet.component.html',
  styleUrls: ['./modal-baiviet.component.css'],
})
export class ModalBaivietComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private modalService: ModalService,
    private tintucCnttService: TintucCnttService,
    private danhMucService: DanhmucService,
    private loaiBaiVietService: LoaibaivietService,
    private stringCommonService: StringCommonService
  ) {}

  //#region DataTables
  @ViewChild(DataTableDirective, { static: false })
  _dtElement: DataTableDirective; // @ViewChild(DataTableDirective, { static: false }) _dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  //#endregion
  private _username: any = getCookie('displayName');
  private _image: any = null;
  private _imageCanChinhSua: any = null;
  public image: any = 'https://localhost:4100/uploads/cntt/128.png';
  public baiVietCanChinhSua: any;
  public imageCuaBaiVietCanChinhSua: any =
    'https://localhost:4100/uploads/cntt/128.png';
  public Editor = ClassicEditor;
  public formBaiViet = new FormGroup({
    _id: new FormControl(null),
    maBaiViet: new FormControl(null, Validators.required),
    anhBia: new FormControl(null),
    maDanhMuc: new FormControl(-1),
    loaiBaiViet: new FormControl(-1),
    tieuDe: new FormControl(null, Validators.required),
    tieuDeASCII: new FormControl(null),
    moTaNgan: new FormControl(null),
    noiDung: new FormControl(null, Validators.required),
    noiDungASCII: new FormControl(null),
    nguoiViet: new FormControl(null),
    thoiGianDangBai: new FormControl(),
    viTriHienThi: new FormControl(-1),
    trangThai: new FormControl(1),
  });
  public formChinhSuaBaiViet = new FormGroup({
    _id: new FormControl(null),
    maBaiViet: new FormControl(null, Validators.required),
    anhBia: new FormControl(null),
    maDanhMuc: new FormControl(-1),
    loaiBaiViet: new FormControl(-1),
    tieuDe: new FormControl(null, Validators.required),
    tieuDeASCII: new FormControl(null),
    moTaNgan: new FormControl(null),
    noiDung: new FormControl(null, Validators.required),
    noiDungASCII: new FormControl(null),
    nguoiViet: new FormControl(null),
    thoiGianDangBai: new FormControl(),
    viTriHienThi: new FormControl(-1),
    trangThai: new FormControl(1),
  });
  public danhSachDanhMuc: any = [];
  public danhSachLoaiBaiViet: any = [];
  public danhSachBaiViet: any = [];
  public danhSachTrangThai: any = [
    {
      maTrangThai: 0,
      tenTrangThai: 'Đã xoá',
    },
    {
      maTrangThai: 1,
      tenTrangThai: 'Đăng ngay',
    },
    {
      maTrangThai: 2,
      tenTrangThai: 'Chờ phê duyệt',
    },
  ];
  public viTriHienThi: any = [
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
    {
      maViTri: 4,
      tenViTri: 'Mô tả cơ hội việc làm',
    },
  ];
  public trangThaiCuaForm: Number = 0; // 0: Thêm mới, 1: Chỉnh sửa

  ngOnInit(): void {
    this.getDanhSachBaiViet();
    this.getDanhSachDanhMuc();
    this.getDanhSachLoaiBaiViet();

    // DataTables
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    };
  }

  ngAfterViewInit(): void {
    // this.dtTrigger.next(); // DataTables
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe(); // DataTables
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  // DataTables
  reRenderDataTables(): void {
    this._dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // this.getDanhSachBaiViet();
      // // Destroy the table first
      // dtInstance.destroy();
      // // Call the dtTrigger to rerender again
      // this.dtTrigger.next();
    });
  }

  getDanhSachBaiViet() {
    this.tintucCnttService.danhSachTinTuc().subscribe((data) => {
      this.danhSachBaiViet = data;
      // console.log('danhSachBaiViet');
      // console.log(this.danhSachBaiViet);
      this.getMaBaiVietCuoiCung();
      this.dtTrigger.next(); // DataTables
    });
  }

  getDanhSachDanhMuc(): void {
    this.danhMucService.getDanhSachDanhMuc().subscribe((data) => {
      this.danhSachDanhMuc = data.data;
    });
  }

  getDanhSachLoaiBaiViet(): void {
    this.loaiBaiVietService.getDanhSachLoaiBaiViet().subscribe((data) => {
      this.danhSachLoaiBaiViet = data.data;
    });
  }

  getMaBaiVietCuoiCung(): void {
    const obj = this.danhSachBaiViet.data;
    let _maBaiViet: string;
    if (obj.length > 0) {
      _maBaiViet = obj[obj.length - 1].maBaiViet;
      if (_maBaiViet !== undefined) {
        const index = parseInt(_maBaiViet.substr(2, _maBaiViet.length));
        if (index < 10) {
          _maBaiViet = 'BV0' + (index + 1);
        } else {
          _maBaiViet = 'BV' + (index + 1);
        }
      }
    } else {
      _maBaiViet = 'BV01';
    }
    this.formBaiViet.patchValue({
      maBaiViet: _maBaiViet,
    });
  }

  onFileSelected(event) {
    if (event.target.files.length > 0) {
      this._image = event.target.files[0];
      // console.log(this._image);
    }
  }

  onFileSelected2(event) {
    if (event.target.files.length > 0) {
      this._imageCanChinhSua = event.target.files[0];
    }
  }

  displayViTriHienThi(maViTri: any): string {
    switch (maViTri) {
      case 0:
        return 'Bài viết quan trọng';
      case 1:
        return 'Cơ hội việc làm';
      case 2:
        return 'Giới thiệu ngắn';
      case 3:
        return 'Tin tức nổi bật';
      case 4:
        return 'Mô tả cơ hội việc làm';
      default:
        return 'Không hiển thị';
    }
  }

  displayTrangThai(maTrangThai: any): string {
    switch (maTrangThai) {
      case 0:
        return 'Đã xoá';
      case 1:
        return 'Đã đăng';
      case 2:
        return 'Chờ phê duyệt';
      default:
        return 'Sai trạng thái';
    }
  }

  displayTenDanhMuc(maDanhMuc: string): string {
    try {
      const danhMuc = this.danhSachDanhMuc.filter(
        (x) => x.maDanhMuc === maDanhMuc
      );
      return danhMuc[0].tenDanhMuc;
    } catch (error) {
      return '-1';
    }
  }

  displayLoaiBaiViet(maLoaiBaiViet: string): string {
    try {
      const loaiBaiViet = this.danhSachLoaiBaiViet.filter(
        (x) => x.maLoaiBaiViet === maLoaiBaiViet
      );
      return loaiBaiViet[0].tenLoaiBaiViet;
    } catch (error) {
      return '-1';
    }
  }

  displayBaiVietCanChinhSua(baiViet: any): void {
    this.formChinhSuaBaiViet.patchValue(baiViet);
    this.trangThaiCuaForm = 1;
    this.imageCuaBaiVietCanChinhSua =
      'https://' + this.danhSachBaiViet.domain + '/' + baiViet.anhBia;
  }

  formatDatetime(time: string): string {
    time = moment(time).format('HH:mm, DD-MM-YYYY');
    return time;
  }

  onResetForm(): void {
    this.formBaiViet.reset();
    this._image = null;
    this.image = 'https://localhost:4100/uploads/cntt/128.png';
  }

  onResetFormChinhSua(): void {
    this.formChinhSuaBaiViet.reset();
    this._imageCanChinhSua = null;
    this.imageCuaBaiVietCanChinhSua =
      'https://localhost:4100/uploads/cntt/128.png';
  }

  saveBaiViet(): void {
    if (this.formBaiViet.valid && this._image !== null) {
      const tieuDeAfterRemoveHTMLTag = this.stringCommonService.removeSpaceAndHTMLTag(
        this.formBaiViet.get('tieuDe').value
      );
      const noiDungAfterRemoveHTMLTag = this.stringCommonService.removeSpaceAndHTMLTag(
        this.formBaiViet.get('noiDung').value
      );
      this.formBaiViet
        .get('tieuDeASCII')
        .setValue(this.stringCommonService.toASCII(tieuDeAfterRemoveHTMLTag));
      this.formBaiViet
        .get('noiDungASCII')
        .setValue(this.stringCommonService.toASCII(noiDungAfterRemoveHTMLTag));

      // FORM DATA
      const formData = new FormData();
      formData.append('maBaiViet', this.formBaiViet.get('maBaiViet').value);
      formData.append('photos', this._image);
      formData.append('maDanhMuc', this.formBaiViet.get('maDanhMuc').value);
      formData.append('loaiBaiViet', this.formBaiViet.get('loaiBaiViet').value);
      formData.append('tieuDe', this.formBaiViet.get('tieuDe').value);
      formData.append('tieuDeASCII', this.formBaiViet.get('tieuDeASCII').value);
      formData.append('moTaNgan', this.formBaiViet.get('moTaNgan').value);
      formData.append('noiDung', this.formBaiViet.get('noiDung').value);
      formData.append(
        'noiDungASCII',
        this.formBaiViet.get('noiDungASCII').value
      );
      formData.append('nguoiViet', this._username);
      formData.append(
        'viTriHienThi',
        this.formBaiViet.get('viTriHienThi').value
      );
      formData.append('trangThai', this.formBaiViet.get('trangThai').value);
      this.tintucCnttService.themTinTuc(formData).subscribe((res) => {
        this.getDanhSachBaiViet();
        this.onResetForm();
        alert(res.message);
        this.reRenderDataTables(); // DataTables
      });
    } else {
      alert('Vui lòng nhập đầy đủ các thông tin');
    }
  }

  saveEditBaiViet(): void {
    if (this.formChinhSuaBaiViet.valid && this._imageCanChinhSua !== null) {
      const tieuDeAfterRemoveHTMLTag = this.stringCommonService.removeSpaceAndHTMLTag(
        this.formChinhSuaBaiViet.get('tieuDe').value
      );
      const noiDungAfterRemoveHTMLTag = this.stringCommonService.removeSpaceAndHTMLTag(
        this.formChinhSuaBaiViet.get('noiDung').value
      );
      this.formChinhSuaBaiViet
        .get('tieuDeASCII')
        .setValue(this.stringCommonService.toASCII(tieuDeAfterRemoveHTMLTag));
      this.formChinhSuaBaiViet
        .get('noiDungASCII')
        .setValue(this.stringCommonService.toASCII(noiDungAfterRemoveHTMLTag));
      // FORM DATA
      const formData = new FormData();
      formData.append(
        'maBaiViet',
        this.formChinhSuaBaiViet.get('maBaiViet').value
      );
      formData.append('photos', this._imageCanChinhSua);
      formData.append(
        'maDanhMuc',
        this.formChinhSuaBaiViet.get('maDanhMuc').value
      );
      formData.append(
        'loaiBaiViet',
        this.formChinhSuaBaiViet.get('loaiBaiViet').value
      );
      formData.append('tieuDe', this.formChinhSuaBaiViet.get('tieuDe').value);
      formData.append(
        'tieuDeASCII',
        this.formChinhSuaBaiViet.get('tieuDeASCII').value
      );
      formData.append(
        'moTaNgan',
        this.formChinhSuaBaiViet.get('moTaNgan').value
      );
      formData.append('noiDung', this.formChinhSuaBaiViet.get('noiDung').value);
      formData.append(
        'noiDungASCII',
        this.formChinhSuaBaiViet.get('noiDungASCII').value
      );
      formData.append('nguoiViet', this._username);
      formData.append(
        'viTriHienThi',
        this.formChinhSuaBaiViet.get('viTriHienThi').value
      );
      formData.append(
        'trangThai',
        this.formChinhSuaBaiViet.get('trangThai').value
      );
      formData.append('_id', this.formChinhSuaBaiViet.get('_id').value);
      this.tintucCnttService.editTinTuc(formData).subscribe((res) => {
        this.getDanhSachBaiViet();
        this.onResetFormChinhSua();
        alert(res.message);
        this.closeModal('cntt_chinhsuabaiviet');
        this.reRenderDataTables(); // DataTables
      });
    } else {
      alert('Vui lòng nhập đầy đủ các thông tin và chọn hình ảnh mới');
    }
  }

  xoaBaiViet(maBaiViet: string): void {
    const anwser = confirm('Nhấn OK để xoá bài viết này');
    if (anwser) {
      this.tintucCnttService
        .deleteTinTuc({
          maBaiViet: maBaiViet,
        })
        .subscribe((res) => {
          this.getDanhSachBaiViet();
          alert('Xoá bài viết thành công');
        });
    }
  }
//form them
  get maDanhMuc() { return this.formBaiViet.get('maDanhMuc'); }
  get moTaNgan() { return this.formBaiViet.get('moTaNgan'); }
  get loaiBaiViet() { return this.formBaiViet.get('loaiBaiViet'); }
  get tieuDe() { return this.formBaiViet.get('tieuDe'); }
  get noiDung() { return this.formBaiViet.get('noiDung'); }
  get ViTriHienThi() { return this.formBaiViet.get('viTriHienThi'); }
  get trangThai() { return this.formBaiViet.get('trangThai'); }
//form edit
  get maDanhMuc2() { return this.formChinhSuaBaiViet.get('maDanhMuc'); }
  get moTaNgan2() { return this.formChinhSuaBaiViet.get('moTaNgan'); }
  get loaiBaiViet2() { return this.formChinhSuaBaiViet.get('loaiBaiViet'); }
  get tieuDe2() { return this.formChinhSuaBaiViet.get('tieuDe'); }
  get noiDung2() { return this.formChinhSuaBaiViet.get('noiDung'); }
  get ViTriHienThi2() { return this.formChinhSuaBaiViet.get('viTriHienThi'); }
  get trangThai2() { return this.formChinhSuaBaiViet.get('trangThai'); }
}
