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
import saveAs from 'file-saver';
import { getCookie } from '../../../../../../../../common/helper';
@Component({
  selector: 'app-xembaigiangsv',
  templateUrl: './xembaigiangsv.component.html',
  styleUrls: ['./xembaigiangsv.component.css']
})
export class XembaigiangsvComponent implements OnInit {

  public baiGiang?: BaiGiang;
  public dsBinhLuan: any;
  public maLHP: any;
  public binhLuan = new FormControl('');
  public mssv = getCookie('email').slice(0, 10);
  constructor(
    private route: ActivatedRoute,
    private baiGiangService: BaiGiangService,
    private binhLuanService: BinhLuanService,
    private _fileService:FileService,
    private activityService:ActivityService
  ) {}

  ngOnInit(): void {
    this.xem_baiGiang();
  }

  private themActivity(maDoiTuong, noiDung) {
    this.activityService.themActivity(this.maLHP, maDoiTuong, "BL-BG", noiDung, "bình luận").subscribe(res => {
      // console.log(res);
    })
  }

  public xem_baiGiang() {
    this.route.params.subscribe((params) => {
      this.baiGiangService
        .layTheo_maBaiGiang(params.id)
        .subscribe((res: any) => {
          if (res.data) {

            this.baiGiang = res.data;
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
      nguoiTao: this.mssv,
    };
    this.binhLuanService.themBinhluan(data).subscribe((res:any) => {
      if(typeof res.data == 'object'){
        //mã bài viết là mã bài giảng
        this.baiGiangService.layTheo_maBaiGiang(data.maBaiViet).subscribe((res:any) => {
          this.maLHP = res.data.maLopHocPhan;
          this.themActivity(data.maBaiViet, res.data.tieuDe);
        })
      }
    });
  }
  download(filename) {
    // var filename = this.attachmentList[index].uploadname;

    this._fileService.downloadFileBaiGiang(filename).subscribe(
      (data) => saveAs(data, filename),
      (error) => console.log(error)
    );
  }
}
