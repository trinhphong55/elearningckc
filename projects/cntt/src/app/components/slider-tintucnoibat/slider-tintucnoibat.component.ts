import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

declare const $: any;
declare const Swiper: any;

@Component({
  selector: 'app-slider-tintucnoibat',
  templateUrl: './slider-tintucnoibat.component.html',
  styleUrls: ['./slider-tintucnoibat.component.css'],
})
export class SliderTintucnoibatComponent implements OnInit, AfterViewInit {
  @Input() DanhSachTinTucNoiBat: any;
  constructor() {}

  private _slideNoiBat: any;
  private _slideMoiNhat: any;

  ngOnInit(): void {
    setTimeout(() => {
      this._slideMoiNhat.update();
      this._slideMoiNhat.update();
    }, 1000);
  }

  ngAfterViewInit(): void {
    this._slideNoiBat = new Swiper('.news_home__main .swiper-container', {
      // effect: 'fade',
      // fadeEffect: {
      //   crossFade: true,
      // },
      spaceBetween: 30,
      loop: true,
      speed: 1000,
      navigation: {
        nextEl: '.news_home__main__nav-next',
        prevEl: '.news_home__main__nav-prev',
      },
      autoplay: {
        delay: 4000,
      },
      breakpoints: {
        768: {
          speed: 3000,
        },
      },
    });
    this._slideMoiNhat = new Swiper('.news_home__sub .swiper-container', {
      direction: 'vertical',
      slidesPerView: 'auto',
      autoHeight: true,
      navigation: {
        nextEl: '.news_home__sub__nav-next',
        prevEl: '.news_home__sub__nav-prev',
      },
    });
  }
}