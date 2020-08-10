import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CnttBoSuuTapService } from '../../services/bosuutap.service';

declare const $: any;
declare const Swiper: any;

@Component({
  selector: 'app-donvilienket',
  templateUrl: './donvilienket.component.html',
  styleUrls: ['./donvilienket.component.css'],
})
export class DonvilienketComponent implements OnInit, AfterViewInit {
  constructor(private cnttBoSuuTapService: CnttBoSuuTapService) {
    this.loadDanhSachDonViLienKet();
  }

  public DonViLienKet: any = [];
  private _slide: any;

  ngOnInit(): void {
    setTimeout(() => {
      this._slide.update();
    }, 1000);
  }

  ngAfterViewInit(): void {
    this._slide = new Swiper('.partner_home__slider', {
      loop: true,
      speed: 3000,
      lazy: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      slidesPerView: 2,
      breakpoints: {
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        },
      },
    });
  }

  loadDanhSachDonViLienKet() {
    this.cnttBoSuuTapService.danhSachItemLienKiet().subscribe((data) => {
      this.DonViLienKet = data.data;
    });
  }
}
