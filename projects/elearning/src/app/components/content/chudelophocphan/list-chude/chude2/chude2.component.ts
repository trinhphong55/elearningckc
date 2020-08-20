import { saveAs } from 'file-saver';
import { FormControl } from '@angular/forms';
import { BinhLuanService } from './../../../../../services/binh-luan.service';
import { BaiGiang } from '../../../../../models/bai-giang.interface';
import { BaiGiangService } from './../../../../../services/bai-giang.service';
import { ChuDeService } from './../../../../../services/chu-de.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChuDe } from './../../../../../models/chu-de.interface';
import { Component, OnInit, Input } from '@angular/core';
import { FileService } from '../../../../../services/file.service';
import { BaiTapService } from '../../../../../services/bai-tap.service';
import { BaiTap } from '../../../../../models/bai-tap.interface';

@Component({
  selector: 'app-chude2',
  templateUrl: './chude2.component.html',
  styleUrls: ['./chude2.component.css'],
})
export class Chude2Component implements OnInit {
  public chuDe: ChuDe;
  public dsBaiGiang: BaiGiang[] = [];
  public maLopHocPhan: number = 1;
  public dsBinhLuan_baiGiang: any[] = [];
  public dsBinhLuan_baiTap: any[] = [];

  public binhLuan = new FormControl('');
  public dsBaiTap: BaiTap[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chuDeService: ChuDeService,
    private baiGiangService: BaiGiangService,
    private binhLuanService: BinhLuanService,
    private _fileService: FileService,
    private baiTapService: BaiTapService
  ) {}

  ngOnInit(): void {
    this.xem_ChuDe();
    this.layBinhLuan();
  }
  public formatDate(ngayChinhSua) {
    return (
      new Date(ngayChinhSua).toLocaleDateString() +
      ' - ' +
      new Date(ngayChinhSua).toLocaleTimeString()
    );
  }
  public layDS_binhLuan_baiGiang(LoaiBaiViet, maBaiViet) {
    this.binhLuanService.layBinhLuan(LoaiBaiViet, maBaiViet).subscribe(
      (res: any) => {
        res.data.forEach((element) => {
          element.ngayTao = new Date(element.ngayTao).toUTCString();
        });
        this.dsBinhLuan_baiGiang.push(res);
      },
      (err) => console.log(err)
    );
  }
  public xem_ChuDe() {
    this.route.params.subscribe((params) => {
      this.chuDeService.layMot(params.id).subscribe((res: any) => {
        if (res.data) {
          this.chuDe = res.data;
        }
      });
      this.baiTapService.layTatCa().subscribe((res: any) => {
        this.dsBaiTap = res;
        let tmp = [];
        this.dsBaiTap.forEach((bt) => {
          if (bt.chuDe == params.id) {
            tmp.push(bt);
          }
        });
        this.dsBaiTap = tmp;
      });
      this.baiGiangService.layTheoMaChuDe(params.id).subscribe((res: any) => {
        if (res.data) {
          this.dsBaiGiang = [];
          this.dsBinhLuan_baiGiang = [];
          this.dsBaiGiang = res.data;
          this.dsBaiGiang.forEach((el) => {
            el.ngayChinhSua = this.formatDate(el.ngayChinhSua);
            el.dinhKem.forEach((filename) => {
              filename =
                '...' + filename.slice(filename.length / 2, filename.length);
            });
            // console.log(el);
          });
        }
      });
    });
  }
  public onClick_BinhLuan(maBaiGiang, maLoai) {
    this.themBinhLuan(maBaiGiang, maLoai);

    this.binhLuan.setValue('');
  }
  public themBinhLuan(maBaiGiang, maLoai) {
    let data = {
      loaiBaiViet: maLoai,
      maBaiViet: maBaiGiang,
      noiDung: this.binhLuan.value,
      nguoiTao: '0306171249',
    };
    this.binhLuanService.themBinhluan(data).subscribe((res) => {
      this.layBinhLuan();
    });
  }
  download(filename) {
    // var filename = this.attachmentList[index].uploadname;
    this._fileService.downloadFileBaiGiang(filename).subscribe(
      (data) => saveAs(data, filename),
      (error) => console.log(error)
    );
  }
  public layBinhLuan() {
    this.binhLuanService.layTatCaBinhLuan().subscribe((res: any) => {
      res.forEach((element) => {
        if (element.loai == 1) {
          this.dsBinhLuan_baiGiang = element.data;
        }
        if (element.loai == 2) {
          this.dsBinhLuan_baiTap= element.data;
        }
      });
    });
  }
}
