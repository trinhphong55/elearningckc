import { FormControl } from '@angular/forms';
import { BinhLuanService } from './../../../../../services/binh-luan.service';
import { BaiTap } from './../../../../../models/bai-tap.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaiTapService } from '../../../../../services/bai-tap.service';
import { BaiTapSinhVienService } from '../../../../../services/baiTapSinhVien.service';
import { CookieService } from 'ngx-cookie-service';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { FileService } from '../../../../../services/file.service';
import saveAs from 'file-saver';
import { ActivityService } from '../../../../../services/activity.service';
import { getCookie } from '../../../../../../../../common/helper';
const uri = 'https://localhost:4100/api/baitap/uploads';
@Component({
  selector: 'app-xembaitapsv',
  templateUrl: './xembaitapsv.component.html',
  styleUrls: ['./xembaitapsv.component.css'],
})
export class XembaitapsvComponent implements OnInit {
  public baiTap: BaiTap;
  public dsBinhLuan: any;
  public maLHP: any;
  public mssv = getCookie('email').slice(0, 10);
  public binhLuan = new FormControl('');
  //uplpadfile trinh phong
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;
  nopBt: any;
  dsBaiTap: any;
  data: any;
  _id: string;
  chuDe: string;
  maBaiTap: string;
  phong: any;
  maHocPhan: any;
  xoaBaiTap: any;
  tinhTrang:string="Chưa nộp"
  uploader: FileUploader = new FileUploader({
    url: uri,
    maxFileSize: 2048, // Max 2kB
    queueLimit: 3, // Max files can upload
  });

  attachmentList: any = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private baiTapService: BaiTapService,
    private binhLuanService: BinhLuanService,
    private BaiTapSinhVienService: BaiTapSinhVienService,
    private cookie: CookieService,
    private _fileService: FileService,
    private activityService:ActivityService) {

  }

  ngOnInit(): void {
    this.xem_BaiTap();
    this.hienThiBaiTap();


    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.attachmentList.push(JSON.parse(response));
    }

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
  }

  private themActivity(maDoiTuong, noiDung) {
    this.activityService.themActivity(this.maLHP, maDoiTuong, "BL-BT", noiDung, "bình luận").subscribe(res => {
      console.log(res);
    })
  }

  public xem_BaiTap() {
    this.route.params.subscribe((params) => {
      this.baiTapService
        .layBaiTap_theoMaBaiTap(params.id)
        .subscribe((res: any) => {
          if (res.data) {
            this.baiTap = res.data;
            this.layDS_binhLuan_baiGiang(2, this.baiTap.maBaiTap);
            this.maBaiTap = this.baiTap.maBaiTap
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
    this.xem_BaiTap();
    this.binhLuan.setValue('');
  }
  public themBinhLuan(maBaiGiang) {
    let data = {
      loaiBaiViet: '2',
      maBaiViet: maBaiGiang,
      noiDung: this.binhLuan.value,
      nguoiTao: this.mssv,
    };
    this.binhLuanService.themBinhluan(data).subscribe((res:any) => {
      if(typeof res.data == 'object'){
        //mã bài viết là mã bài tập
        this.baiTapService.layBaiTap_theoMaBaiTap(data.maBaiViet).subscribe((res:any) => {
          this.maLHP = res.data.lopHocPhan;
          this.themActivity(data.maBaiViet, res.data.tieuDe);
        })
      }
    });
  }


  ////NÔP BAI TAP
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  hienThiBaiTap() {
    this.BaiTapSinhVienService.getall().subscribe(
      (dsBaiTap) => {
        this.dsBaiTap = dsBaiTap;
        console.log(this.baiTap.maBaiTap);
        this.BaiTapSinhVienService.layBttheosinhvien(this.cookie.get("displayName"), this.baiTap.maBaiTap).subscribe(
          (dsBaiTap) => {
            this.dsBaiTap = dsBaiTap;
            if(this.dsBaiTap.length>0)
            {
              this.tinhTrang="Đã nộp";
            }
          })
      },
      (error) => {
        console.log(error);

      }
    )
  }

  //xoabaitap
  xoabaitap(dsBaiTap) {
    this._id = dsBaiTap._id
    this.BaiTapSinhVienService.xoabaitap(dsBaiTap._id).subscribe(
      (xoaBaiTap) => {
        this.xoaBaiTap = xoaBaiTap;
        this.hienThiBaiTap();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  //nop bai tap
  themBaiTap() {
    for (let item of this.uploader.queue) {
      var maLopHocPhan: any;
      var maSinhVien: any;
      var maBaiTap: any;
      var ChuDe: any;
      this.data = { maLopHocPhan: "1", maSinhVien: this.cookie.get("displayName"), maBaiTap: this.baiTap.maBaiTap, chuDe: item?.file?.name };
      this.BaiTapSinhVienService.addBaiTap(this.data).subscribe(
        (nopBt) => {
          this.nopBt = nopBt;
          this.nopBt;
          this.hienThiBaiTap();
          this.uploader = new FileUploader({
            formatDataFunction: async (item) => {
              return new Promise((resolve, reject) => {
                resolve({
                  name: item._file.name,
                  length: item._file.size,
                  contentType: item._file.type,
                  date: new Date(),
                  maxFileSize: 2048,
                  queueLimit: 3,
                });
                console.log(name)
              });
            }
          });
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }
  download(index) {
    var filename = this.attachmentList[index].uploadname;

    this._fileService.downloadFile(filename)
      .subscribe(
        data => saveAs(data, filename),
        error => console.error(error)
      );
  }
}
