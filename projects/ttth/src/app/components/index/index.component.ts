import { Component, OnInit } from '@angular/core';
import { ttthBanner } from '../../models/ttthBanner';
import { ttthCamOn } from '../../models/ttthCamOn';
import { ttthTienIch } from '../../models/ttthTienIch';
import { BannerService } from '../../services/banner.service';
import { CamonService } from '../../services/camon.service';
import { TienichService } from '../../services/tienich.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  Banner: ttthBanner[];
  CamOn: ttthCamOn[];
  TienIch: ttthTienIch[];
  constructor(private bannerService: BannerService,private camonService: CamonService,private tienichService: TienichService) { }

  ngOnInit(): void {
    this.getBannerfromServices();
    this.getCamOnfromServices();
    this.getTienIchfromServices();
  }
  getBannerfromServices(): void {
    this.bannerService.getBanner().subscribe(data => this.Banner = data);
  }
  getCamOnfromServices(): void {
    this.camonService.get().subscribe(data => this.CamOn = data);
  }
  getTienIchfromServices(): void {
    this.tienichService.get().subscribe(data => this.TienIch = data);
  }
}
