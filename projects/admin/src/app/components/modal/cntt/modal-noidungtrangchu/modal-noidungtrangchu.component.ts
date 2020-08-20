import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { TintucCnttService } from '../../../../services/cntt/tintuc-cntt.service';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-modal-noidungtrangchu',
  templateUrl: './modal-noidungtrangchu.component.html',
  styleUrls: ['./modal-noidungtrangchu.component.css'],
})
export class ModalNoidungtrangchuComponent
  implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private modalService: ModalService,
    private baiVietService: TintucCnttService
  ) {}

  rawData: any = [];
  listBaiVietQuanTrong: any = [];
  listCoHoiViecLam: any = [];
  listGioiThieuNgan: any = [];
  listTinTucNoiBat: any = [];
  viTriHienThi: any = [
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
  ];
  ngOnInit(): void {
    this.getRawData();
  }

  ngAfterViewInit(): void {
    $(document).ready(function () {
      // $('.box-img').fancybox({
      //   openEffect: 'elastic',
      //   closeEffect: 'none',
      // });
    });
  }

  ngOnDestroy(): void {
    // $('.box-img').off();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  getRawData(): void {
    this.baiVietService.danhSachTinTuc().subscribe((data) => {
      this.rawData = data;
      this.filterDataFromArrayRawData();
    });
  }

  filterDataFromArrayRawData(): void {
    this.listBaiVietQuanTrong = this.rawData.data.filter(
      (x) => x.viTriHienThi === 0
    );
    this.listCoHoiViecLam = this.rawData.data.filter(
      (x) => x.viTriHienThi === 1
    );
    this.listGioiThieuNgan = this.rawData.data.filter(
      (x) => x.viTriHienThi === 2
    );
    this.listTinTucNoiBat = this.rawData.data.filter(
      (x) => x.viTriHienThi === 3
    );
  }

  onClickLogData(): void {
    // console.log('log rawData');
    // console.log(this.rawData.data);
    // console.log('log listBaiVietQuanTrong');
    // console.log(this.listBaiVietQuanTrong);
    // console.log('log listCoHoiViecLam');
    // console.log(this.listCoHoiViecLam);
    // console.log('log listGioiThieuNgan');
    // console.log(this.listGioiThieuNgan);
    // console.log('log listTinTucNoiBat');
    // console.log(this.listTinTucNoiBat);
  }

  formatDatetime(time: string): string {
    time = moment(time).format('HH:mm, DD-MM-YYYY');
    return time;
  }
}
