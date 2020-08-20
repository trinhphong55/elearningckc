import { BaiGiangService } from './../../../../../services/bai-giang.service';
import { BaiGiang } from './../../../../../models/bai-giang.interface';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BaiTap } from '../../../../../models/bai-tap.interface';
import { BaiTapService } from '../../../../../services/bai-tap.service';
import { BinhLuanService } from '../../../../../services/binh-luan.service';
import { ActivityService } from '../../../../../services/activity.service';
import { FileService } from '../../../../../services/file.service';
import { getCookie } from '../../../../../../../../common/helper';
import saveAs from 'file-saver';
import { CookieService } from 'ngx-cookie-service';
import { GiaoVienService } from '../../../../../services/giao-vien.service';
@Component({
  selector: 'app-xembaiganggv',
  templateUrl: './xembaiganggv.component.html',
  styleUrls: ['./xembaiganggv.component.css'],
})
export class XembaiganggvComponent implements OnInit {
  public baiGiang?: BaiGiang;
  public dsBinhLuan: any;
  public maLHP: any;
  public binhLuan = new FormControl('');
  public email: any = getCookie('email');
  constructor(
    private route: ActivatedRoute,
    private baiGiangService: BaiGiangService,
    private binhLuanService: BinhLuanService,
    private _fileService: FileService,
    private activityService: ActivityService,
    private cookie: CookieService,
    private giaoVienService: GiaoVienService
  ) {}

  ngOnInit(): void {
    this.xem_baiGiang();
  }
  public xem_baiGiang() {
    this.route.params.subscribe((params) => {
      this.baiGiangService
        .layTheo_maBaiGiang(params.id)
        .subscribe((res: any) => {
          console.log(res);
          if (res.data) {

            this.baiGiang = res.data;
            this.giaoVienService
              .Laythongtingiaovien(this.baiGiang.nguoiDang)
              .subscribe((res:any) => {

                if (res.length > 0) {
                  this.baiGiang.nguoiDang = res[0].ho + ' ' + res[0].ten;
                }
              });
            this.layDS_binhLuan_baiGiang(1, this.baiGiang.maBaiGiang);
          }
        });
    });
  }
  public layDS_binhLuan_baiGiang(LoaiBaiViet, maBaiViet) {
    this.binhLuanService.layBinhLuan(LoaiBaiViet, maBaiViet).subscribe(
      (res: any) => {
        res.data.forEach((element) => {
          element.ngayTao = new Date(element.ngayTao).toUTCString();
        });
        this.dsBinhLuan = res;
      },
      (err) => console.log(err)
    );
  }
  public onClick_BinhLuan(maBaiGiang) {
    this.themBinhLuan(maBaiGiang);
    this.xem_baiGiang();
    this.binhLuan.setValue('');
  }
  public themBinhLuan(maBaiGiang) {
    let data = {
      loaiBaiViet: '1',
      maBaiViet: maBaiGiang,
      noiDung: this.binhLuan.value,
      nguoiTao: this.email,
    };
    this.binhLuanService.themBinhluan(data).subscribe((res: any) => {
      if (typeof res.data == 'object') {
        //mã bài viết là mã bài giảng
        this.baiGiangService
          .layTheo_maBaiGiang(data.maBaiViet)
          .subscribe((res: any) => {
            this.maLHP = res.data.maLopHocPhan;
            this.themActivity(data.maBaiViet, res.data.tieuDe);
          });
      }
    });
  }

  private themActivity(maDoiTuong, noiDung) {
    this.activityService
      .themActivity(this.maLHP, maDoiTuong, 'BL-BG', noiDung, 'bình luận')
      .subscribe((res) => {
        console.log(res);
      });
  }

  download(filename) {

    this._fileService.downloadFileBaiGiang(filename).subscribe(
      (data) => saveAs(data, filename),
      (error) => console.log(error)
    );
  }
}
