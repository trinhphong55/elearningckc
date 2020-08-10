import { FormControl } from '@angular/forms';
import { BinhLuanService } from './../../../../../services/binh-luan.service';
import { BaiTap } from './../../../../../models/bai-tap.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaiTapService } from '../../../../../services/bai-tap.service';
import { BaiTapSinhVienService } from '../../../../../services/baiTapSinhVien.service';
import { FileUploader } from 'ng2-file-upload';
import {CookieService} from 'ngx-cookie-service';
@Component({
  selector: 'app-xembaitapsv',
  templateUrl: './xembaitapsv.component.html',
  styleUrls: ['./xembaitapsv.component.css'],
})
export class XembaitapsvComponent implements OnInit {
  public baiTap: BaiTap;
  public dsBinhLuan: any;
  public binhLuan = new FormControl('');
  //uplpadfile trinh phong
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;
  nopBt:any;
  dsBaiTap: any;
  data:any;
  _id: string ;
  chuDe:string;
  maBaiTap:string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private baiTapService: BaiTapService,
    private binhLuanService: BinhLuanService,
    private BaiTapSinhVienService: BaiTapSinhVienService,
    private cookie:CookieService,
  ) {
    this.uploader = new FileUploader({
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item) => {
        return new Promise((resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });

    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe(res => this.response = res);
  }

  ngOnInit(): void {
    this.xem_BaiTap();
    this.hienThiBaiTap();
  }
  public xem_BaiTap() {
    this.route.params.subscribe((params) => {
      this.baiTapService
        .layBaiTap_theoMaBaiTap(params.id)
        .subscribe((res: any) => {
          if (res.data) {
            this.baiTap = res.data;
            this.layDS_binhLuan_baiGiang(2, this.baiTap.maBaiTap);
            this.maBaiTap  =this.baiTap.maBaiTap
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
      nguoiTao: '0306171249',
    };
    this.binhLuanService.themBinhluan(data).subscribe((res) => { });
  }


  ////NÔP BAI TAP
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  hienThiBaiTap() {
    this.BaiTapSinhVienService.layBttheosinhvien(this.cookie.get("displayName"),"1" ).subscribe(
      (dsBaiTap) => {
        this.dsBaiTap = dsBaiTap;
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
      (dsBaiTap) => {
        this.dsBaiTap = dsBaiTap;
        this.hienThiBaiTap();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  //nop bai tap
  themBaiTap(){
    var maLopHocPhan:any;
    var maSinhVien:any;
    var maBaiTap:any;
    var ChuDe:any;
    this.data=  {maLopHocPhan:"2",maSinhVien: this.cookie.get("displayName"),maBaiTap:this.baiTap.maBaiTap,chuDe:""};
    this.BaiTapSinhVienService.addBaiTap(this.data).subscribe(
      (nopBt) => {
        this.nopBt = nopBt;
        this.nopBt;
        this.hienThiBaiTap();
      },
      (error) => {
        console.log(error);
      }
    )
  }
}


