import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { TinTucCnttService } from '../../services/tintuc.service';
import * as moment from 'moment';
declare const $: any;
declare const Swiper: any;

@Component({
  selector: 'app-slider-tintucnoibat',
  templateUrl: './slider-tintucnoibat.component.html',
  styleUrls: ['./slider-tintucnoibat.component.css'],
})
export class SliderTintucnoibatComponent implements OnInit, AfterViewInit {
  TinTucNoiBat: any[];
  TinTucMoiNhat: any[];
  @Input() DanhSachTinTucNoiBat: any;
  constructor(private tinTucCnttService: TinTucCnttService) {}

  private _slideNoiBat: any;
  private _slideMoiNhat: any;

  ngOnInit(): void {
    setTimeout(() => {
      this._slideNoiBat.update();
      this._slideMoiNhat.update();
    }, 1000);
    this.loadTinTucNoiBat();
    this.loadTinTucMoiNhat();
  }

  loadTinTucNoiBat() {
    this.tinTucCnttService.loadTinTucNoiBat().subscribe((data) => {
      this.TinTucNoiBat = data.data;
    });
  }

  loadTinTucMoiNhat() {
    this.tinTucCnttService.loadTinTucMoiNhat().subscribe((data) => {
      this.TinTucMoiNhat = data.data;
    });
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

  formatDatetime(time: string): string {
    time = moment(time).format('HH:mm, DD-MM-YYYY');
    return time;
  }
}
