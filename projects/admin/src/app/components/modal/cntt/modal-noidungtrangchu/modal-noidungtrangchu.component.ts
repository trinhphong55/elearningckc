import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { TintucCnttService } from '../../../../services/cntt/tintuc-cntt.service';
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

  ngOnInit(): void {
    this.getRawData();
  }

  ngAfterViewInit(): void {
    $(document).ready(function () {
      $('.box-img').fancybox({
        openEffect: 'elastic',
        closeEffect: 'none',
      });
    });
  }

  ngOnDestroy(): void {
    $('.box-img').off();
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
  }

  onClickLogData(): void {
    console.log('log rawData');
    console.log(this.rawData.data);
    console.log('log listBaiVietQuanTrong');
    console.log(this.listBaiVietQuanTrong);
  }
}
