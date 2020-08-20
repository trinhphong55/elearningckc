import { LopHocPhanService } from './../../../../services/lophocphan.service';
import { LopHocPhan } from './../../../../models/lophocphan.interface';
import { FileUploader } from 'ng2-file-upload';
import { BaiGiang } from './../../../../models/bai-giang.interface';
import { FormControl } from '@angular/forms';
import { FileService } from './../../../../services/file.service';
import { BaiGiangService } from './../../../../services/bai-giang.service';
import { Component, OnInit } from '@angular/core';
import { ChuDe } from '../../../../models/chu-de.interface';
import { ChuDeService } from '../../../../services/chu-de.service';
import saveAs from 'file-saver';
import { ActivityService } from '../../../../services/activity.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
const uri = 'https://localhost:4100/api/baigiang/upload';
@Component({
  selector: 'app-taobaigiang',
  templateUrl: './taobaigiang.component.html',
  styleUrls: ['./taobaigiang.component.css'],
})
export class TaobaigiangComponent implements OnInit {
  checked: boolean = false;
  public dsChuDe: ChuDe[] = [];
  public dsLopHocPhan: LopHocPhan[] = [];
  toppings = new FormControl();
  lopHoc = new FormControl('');
  chuDe = new FormControl('');
  inputTieuDe = new FormControl('');
  textMoTa = new FormControl('');

  constructor(
    private _fileService: FileService,
    private _baiGiangService: BaiGiangService,
    private _chuDeService: ChuDeService,
    private _lopHocPhanService: LopHocPhanService,
    private _activityService: ActivityService,
    private cookieService: CookieService,
    private toastr: ToastrService
  ) {}
  baiGiang: any;

  ngOnInit(): void {
    // this.baiGiang.tieuDe = 'test tieuDe';
    // this.baiGiang.moTa = 'test huongDan';
    // this.baiGiang.maLopHocHocPhan = '1';
    // this.baiGiang.maChuDe = '1';

    this.uploader.onCompleteAll = () => {
      this.baiGiang.dinhKem = this.attachmentList;
      this._baiGiangService.them(this.baiGiang).subscribe((data: any) => {
        this.toastr.success(data.message, 'Thông báo');
      });
    };

    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      this.attachmentList.push(JSON.parse(response));
    };

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };
    this.layDS_ChuDe();
    this.layDS_LopHocPhan();
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  saveBaiGiang() {
    if (this.uploader.queue.length !== 0) {
      this.uploader.uploadAll();
    } else {
      this._baiGiangService.them(this.baiGiang).subscribe(
        (data: any) => {
          this.toastr.success(data.message, 'Thông báo');

          this._setActivity(data.data.maBaiGiang);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  private _setActivity(maDoiTuong) {
    this._activityService
      .themActivity(
        this.baiGiang.maLopHocPhan,
        maDoiTuong,
        'BG',
        this.baiGiang.tieuDe,
        'đăng'
      )
      .subscribe((res) => {});
  }

  // Upload file

  uploader: FileUploader = new FileUploader({
    url: uri,
    maxFileSize: 1024 * 1024 * 5 * 8, // Max 2kB
    queueLimit: 3, // Max files can upload
  });

  attachmentList: string[] = [];

  download(filename) {
    // var filename = this.attachmentList[index].uploadname;
    this._fileService.downloadFile(filename).subscribe(
      (data) => saveAs(data, filename),
      (error) => console.error(error)
    );
  }
  public layDS_ChuDe() {
    this._chuDeService.layTatCa().subscribe(
      (res: any) => {
        if (res.data) {
          this.dsChuDe = res.data;
        } else {
        }
      },
      (err) => this.toastr.error(err.message, 'Lỗi')
    );
  }
  public layDS_LopHocPhan() {
    this._lopHocPhanService.getLopHocPhan().subscribe(
      (res: any) => {
        if (res) {
          this.dsLopHocPhan = res;
        } else {
          this.toastr.error(res + '', 'Lỗi');
        }
      },
      (err) => this.toastr.error(err.message, 'Lỗi')
    );
  }
  public onClickThem() {
    this.baiGiang = {
      tieuDe: this.inputTieuDe.value,
      maLopHocPhan: this.lopHoc.value.toString(),
      maChuDe: this.chuDe.value,
      moTa: this.textMoTa.value,
      nguoiDang: this.cookieService.get('email'),
      nguoiChinhSua: this.cookieService.get('email'),
    };
    this.saveBaiGiang();
  }
}
