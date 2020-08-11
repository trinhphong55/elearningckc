import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
declare var $: any;
declare var Swiper: any;

@Component({
  selector: 'app-slider-cohoivieclam',
  templateUrl: './slider-cohoivieclam.component.html',
  styleUrls: ['./slider-cohoivieclam.component.css'],
})
export class SliderCohoivieclamComponent implements OnInit, AfterViewInit {
  @Input() DanhSachCoHoiViecLam: any;

  constructor() {}

  private _slideCoHoiViecLam: any;

  ngOnInit(): void {
    setTimeout(() => {
      this._slideCoHoiViecLam.update();
    }, 1000);
  }

  ngAfterViewInit(): void {
    this._slideCoHoiViecLam = new Swiper('.job_home__slider', {
      lazy: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      loop: true,
      speed: 1000,
      navigation: {
        nextEl: '.job_home__slider__navigation .next',
        prevEl: '.job_home__slider__navigation .prev',
      },
    });
  }
}
