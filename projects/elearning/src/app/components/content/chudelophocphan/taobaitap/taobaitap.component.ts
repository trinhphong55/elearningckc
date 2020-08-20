import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormControl } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

//Services
import { FileService } from '../../../../services/file.service';
import { BaiTapService } from '../../../../services/bai-tap.service';
import { LopHocPhanService } from '../../../../services/lophocphan.service'
import { ChuDeService } from '../../../../services/chu-de.service';
import { ActivityService } from '../../../../services/activity.service';

//Interfaces
import { BaiTap } from '../../../../models/BaiTap.inteface';
import { LopHocPhan } from '../../../../models/lophocphan.interface';
import { ChuDe } from '../../../../models/chu-de.interface';
import { ToastrService } from 'ngx-toastr';

const uri = 'https://localhost:4100/api/baitap/uploads';

@Component({
  selector: 'app-taobaitap',
  templateUrl: './taobaitap.component.html',
  styleUrls: ['./taobaitap.component.css'],
  providers: [FileService, BaiTapService]
})
export class TaobaitapComponent implements OnInit {

  public dsLHP: LopHocPhan[];
  public dsChuDe: ChuDe[];
  private _maLopHocPhan: number;

  public baitap: BaiTap = {
    tieuDe: "",
    huongDan: "",
    deadLine: "null",
    diem: 10,
    lopHocPhan: -1,
    file: [],
    chuDe: -1,
  }

  newChude = "";

  checked: boolean = false;

  toppings = new FormControl();

  EndDateChange(today: any) {
    if (today.value === null) {
      return;
    }
    let dd = String(today.value.getDate()).padStart(2, '0');
    let mm = String(today.value.getMonth() + 1).padStart(2, '0');
    let yyyy = today.value.getFullYear();
    this.baitap.deadLine = mm + '/' + dd + '/' + yyyy;
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  changeLHP(maLopHocPhan: string) {
    console.log(maLopHocPhan);
    this._chuDeService.layTheo_maLopHocPhan(parseInt(maLopHocPhan)).subscribe(res => {
      this.dsChuDe = res.data;

    })
  }

  changeChuDe(loai: number) {
    if (loai === 2) {
      if (this.newChude.trim() !== "") {
        this.baitap.chuDe = -1;
      }
    } else {
      if (this.baitap.chuDe !== -1) {
        this.newChude = "";
      }
    }
  }

  private _checkNewChuDe(addBT: Function) {
    if (this.newChude.trim() !== "") {
      let data = {
        tenChuDe: this.newChude,
        nguoiChinhSua: 'Huy Ban Bun',
        maLopHocPhan: this._maLopHocPhan,
      }
      this._chuDeService.them(data).subscribe(res => {
        let a: any = res;
        this.baitap.chuDe = a.data.maChuDe;
        addBT();
      })
    } else {
      addBT();
    }
  }

  saveBaiTap() {
    this._validate(() => {
      if (this.uploader.queue.length !== 0) {
        this.uploader.uploadAll();
      } else {
        this._checkNewChuDe(() => {
          this._baiTapService.addBaiTap(this.baitap).subscribe(res => {
            this.toastr.success(res.message, 'Thông báo');
            this._setActivity(res.maDoiTuong);
            this._clearBaiTap();
          })
        })
      }
    });
  }

  private _clearBaiTap() {
    this.baitap = {
      tieuDe: "",
      huongDan: "",
      deadLine: "null",
      diem: 10,
      lopHocPhan: -1,
      file: [],
      chuDe: -1,
    }
    this.uploader.queue = [];
    this.newChude = "";
  }

  private _validate(save: Function) {
    if (this.baitap.tieuDe.trim() === "") {
      this.toastr.warning("Nhập tiêu đề", 'Thông báo');
      return;
    }
    if (this.baitap.lopHocPhan === -1) {
      this.toastr.warning("Chọn lớp học phần", 'Thông báo');
      return;
    }
    save();
  }

  private _setActivity(maDoiTuong) {
    this._activityService.themActivity(this.baitap.lopHocPhan, maDoiTuong, "BT", this.baitap.tieuDe, "đăng").subscribe(res => {
      console.log(res);
    })
  }

  // Upload file

  uploader: FileUploader = new FileUploader({
    url: uri,
    maxFileSize: 8 * 1024 * 1024 * 1, // Max 2kB
    queueLimit: 3, // Max files can upload
  });

  attachmentList: string[] = [];

  constructor(
    private _router: Router,
    private _chuDeService: ChuDeService,
    private _baiTapService: BaiTapService,
    private _activityService: ActivityService,
    private _lopHocPhanService: LopHocPhanService,
    private toastr: ToastrService,) {
    this._maLopHocPhan = parseInt(this._router.url.split('/')[2][0]);
  }

  ngOnInit(): void {
    this._lopHocPhanService.layLopHocPhanCungGV(this._maLopHocPhan).subscribe(res => {
      this.dsLHP = res;
    })

    this.uploader.onCompleteAll = () => {
      this._checkNewChuDe(() => {
        this.baitap.file = this.attachmentList;
        this._baiTapService.addBaiTap(this.baitap).subscribe(res => {
          if (res.status === 200) {
            this.toastr.success(res.message, 'Thông báo');
            this._setActivity(res.maDoiTuong);
            this._clearBaiTap();
          }
        })
      })
    }

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.attachmentList.push(JSON.parse(response));
    }

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
  }
}

