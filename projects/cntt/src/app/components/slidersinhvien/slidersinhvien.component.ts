import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CnttBoSuuTapService } from '../../services/bosuutap.service';
declare var Swiper: any;

@Component({
  selector: 'app-slidersinhvien',
  templateUrl: './slidersinhvien.component.html',
  styleUrls: ['./slidersinhvien.component.css'],
})
export class SlidersinhvienComponent implements OnInit, AfterViewInit {
  Item: any = [];

  constructor(private cnttBoSuuTapService: CnttBoSuuTapService) {
    this.loadDanhSachItemSlider();
  }

  ngOnInit(): void {
  }

  _slider: any;

  ngAfterViewInit(): void {
    this._slider = new Swiper('.gallery_home__slider', {
      spaceBetween: 30,
      loop: true,
      centeredSlides: true,
      lazy: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      speed: 2000,
      slidesPerView: 1,
      breakpoints: {
        768: {
          slidesPerView: 3,
        },
      },
      pagination: {
        el: '.gallery_home__slider__pagination',
        clickable: true,
      },
    });
  }

  loadDanhSachItemSlider() {
    this.cnttBoSuuTapService.danhSachItemSlider().subscribe((data) => {
      this.Item = data.data;
      setTimeout(() => {
        // console.log('run time out');
        this._slider.update();
      }, 0);
    });
  }
}
