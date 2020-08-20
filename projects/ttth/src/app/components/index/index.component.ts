import { Component, OnInit ,AfterViewInit} from '@angular/core';
import { ttthBanner } from '../../models/ttthBanner';
import { ttthCamOn } from '../../models/ttthCamOn';
import { ttthTienIch } from '../../models/ttthTienIch';
import { ttthTinTuc } from '../../models/ttthTinTuc';
import { ttthKhoaHoc } from '../../models/ttthKhoaHoc';
import { BannerService } from '../../services/banner.service';
import { CamonService } from '../../services/camon.service';
import { TienichService } from '../../services/tienich.service';
import { TintucService } from '../../services/tintuc.service';
import { KhoahocService } from '../../services/khoahoc.service';
declare var Swiper: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit,AfterViewInit {
  Banner: ttthBanner[];
  CamOn: ttthCamOn[];
  TienIch: ttthTienIch[];
  TinTucChinh: ttthTinTuc[];
  TinTucPhu: ttthTinTuc[];
  KhoaHoc: ttthKhoaHoc[];
  constructor(private bannerService: BannerService,private camonService: CamonService,private tienichService: TienichService,private tintucService: TintucService,private khoahocService: KhoahocService) { }

  ngOnInit(): void {
    this.getBannerfromServices();
    this.getCamOnfromServices();
    this.getTienIchfromServices();
    this.getTinTucChinh();
    this.getTinTucPhu();
    this.getKhoaHoc();
  }
  _slider: any;
  ngAfterViewInit(): void {
    this._slider = new Swiper('.gallery_home__slider', {
      loop: true,
      centeredSlides: true,
      lazy: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      speed: 2000,
      slidesPerView: 1,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
    });
  }

  getBannerfromServices(): void {
    this.bannerService.getBanner().subscribe((data) => {this.Banner = data; setTimeout(() => {
      this._slider.update();
    }, 0);});
  }
  getCamOnfromServices(): void {
    this.camonService.get().subscribe(data => this.CamOn = data);
  }
  getTienIchfromServices(): void {
    this.tienichService.get().subscribe(data => this.TienIch = data);
  }
  getTinTucChinh():void{
    this.tintucService.getTinTucChinh().subscribe(data => {this.TinTucChinh = data    ;});

  }
  getTinTucPhu():void{
    this.tintucService.getTinTucPhu().subscribe(data => this.TinTucPhu = data);
  }
  getKhoaHoc():void{
    this.khoahocService.get().subscribe(data => this.KhoaHoc = data);
  }
}
