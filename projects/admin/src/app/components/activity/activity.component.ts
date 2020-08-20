import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TintucCnttService } from '../../services/cntt/tintuc-cntt.service';
import * as moment from 'moment';
declare var $: any;
declare var Swiper: any;

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
})
export class ActivityComponent implements OnInit, AfterViewInit {
  constructor(private tintucCnttService: TintucCnttService) {}
  private _highLightSlider: any;
  public danhSachBaiVietMoiNhat: any;
  ngOnInit(): void {
    this.tintucCnttService.danhSachTinTucMoiNhat().subscribe((res) => {
      this.danhSachBaiVietMoiNhat = res.data;
      setTimeout(() => {
        this._highLightSlider.update();
      }, 1000);
    });
  }

  ngAfterViewInit(): void {
    this._highLightSlider = new Swiper('.master_page__chucnang__slider', {
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      speed: 1000,
      navigation: {
        nextEl: '.master_page__chucnang__slider .swiper-button-next',
        prevEl: '.master_page__chucnang__slider .swiper-button-prev',
      },
    });
  }

  formatDatetime(time: string): string {
    if (time) {
      time = moment(time).format('HH:mm, DD-MM-YYYY');
      return time;
    }
    return '';
  }
}
