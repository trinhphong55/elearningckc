import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TintucCnttService } from '../../services/cntt/tintuc-cntt.service';
import { ActivityService } from '../../services/activity/activity.service';
import * as moment from 'moment';
declare var Swiper: any;
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
})
export class ActivityComponent implements OnInit, AfterViewInit {
  private _highLightSlider: any;
  public danhSachBaiVietMoiNhat: any;
  public listActivityElearning: any;

  constructor(
    private tintucCnttService: TintucCnttService,
    private activityService: ActivityService
  ) {
    this.activityService.layDanhSachActivityElearning().subscribe((res) => {
      this.listActivityElearning = res.data;
    });
  }

  ngOnInit(): void {
    this.tintucCnttService.danhSachTinTucMoiNhat().subscribe((res) => {
      this.danhSachBaiVietMoiNhat = res.data;
      setTimeout(() => {
        this._highLightSlider.update();
      }, 1500);
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
      speed: 2000,
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
