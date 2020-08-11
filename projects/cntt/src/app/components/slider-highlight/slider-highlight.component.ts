import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as moment from 'moment';
declare var $: any;
declare var Swiper: any;

@Component({
  selector: 'app-slider-highlight',
  templateUrl: './slider-highlight.component.html',
  styleUrls: ['./slider-highlight.component.css'],
})
export class SliderHighlightComponent implements OnInit, AfterViewInit {
  @Input() BaiVietDauTien: any;
  @Input() DanhSachBaiVietQuanTrong: any;

  constructor() {}

  private _highLightSlider: any;

  ngOnInit(): void {
    setTimeout(() => {
      this._highLightSlider.update();
    }, 1000);
  }

  ngAfterViewInit(): void {
    this._highLightSlider = new Swiper('.highlight_home__slider', {
      spaceBetween: 15,
      speed: 2000,
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 90,
        stretch: 90,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      // autoplay: {
      //   delay: 5000,
      // },
      autoHeight: true,
      pagination: {
        el: '.highlight_home__slider .swiper-pagination',
        clickable: true,
      },
      on: {
        slideChange: function () {
          // console.log('slide change');
          // console.log(this);
          // console.log(this.slides);
          // console.log($(this.slides[this.activeIndex]));
          // console.log($(this.slides[this.activeIndex]).find('.highlight_home__title').text());
          const _this = this.slides[this.activeIndex];
          const _id = $(_this).find('.highlight_home__id').text();
          const _title = $(_this).find('.highlight_home__title').text();
          const _short = $(_this).find('.highlight_home__desc').text();
          const _postTime = $(_this).find('.highlight_home__postedtime').text();
          // console.log(_title, _short, _postTime);
          setTimeout(() => {
            // console.log('run set time out slide change');
            $('.highlight_home__title.important').text(_title);
            $('.highlight_home__desc.important').text(_short);
            $('.highlight_home__postedtime.important').text(_postTime);
          }, 250);
        },
      },
    });
  }

  formatDatetime(time: string): string {
    time = moment(time).format('HH:mm, DD-MM-YYYY');
    return time;
  }
}
